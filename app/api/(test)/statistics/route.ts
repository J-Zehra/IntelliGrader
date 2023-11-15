/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const calculateAccuracy = (totalCorrect: number, totalIncorrect: number) => {
  return Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100);
};

const calculateAverage = (totalStudent: number, totalCorrect: number) => {
  return Math.round(totalCorrect / totalStudent);
};

interface QuestionResult {
  index: number;
  studentCount: number;
  studentNames: string[];
  mostPickedAnswer?: number;
  correctAnswer?: number;
}

const getQuestionsMostStudentsGotRight = (
  correctAnswer: number[],
  studentsAnswers: {
    answerIndices: number[];
    student: { lastName: string; firstName: string; middleName: string };
  }[],
  topCount: number,
): QuestionResult[] => {
  const questionsRightCount: number[] = Array(correctAnswer.length).fill(0);

  const studentsPickedRight: string[][] = correctAnswer.map(() => []);

  studentsAnswers.forEach((studentAnswer) => {
    studentAnswer.answerIndices.forEach((answer, index) => {
      if (answer === correctAnswer[index]) {
        questionsRightCount[index]++;
        studentsPickedRight[index].push(
          `${studentAnswer.student.firstName} ${studentAnswer.student.middleName} ${studentAnswer.student.lastName}`,
        );
      }
    });
  });

  const sortedQuestionsRightCount = questionsRightCount
    .map((count, index) => ({ count, index }))
    .sort((a, b) => b.count - a.count);

  const topRightQuestions: QuestionResult[] = sortedQuestionsRightCount
    .slice(0, topCount)
    .map(({ count, index }) => ({
      index,
      studentCount: count,
      studentNames: studentsPickedRight[index],
      correctAnswer: correctAnswer[index],
    }));

  return topRightQuestions;
};

const getQuestionsMostStudentsGotWrong = (
  correctAnswer: number[],
  studentsAnswers: {
    answerIndices: number[];
    student: { lastName: string; firstName: string; middleName: string };
  }[],
  topCount: number,
): QuestionResult[] => {
  const questionsWrongCount: number[] = Array(correctAnswer.length).fill(0);
  const mostPickedAnswers: number[] = Array(correctAnswer.length).fill(0);

  // Create an array to store the names of students who picked the wrong answer for each question
  const studentsPickedWrong: string[][] = correctAnswer.map(() => []);

  studentsAnswers.forEach((studentAnswer) => {
    studentAnswer.answerIndices.forEach((answer, index) => {
      if (answer !== correctAnswer[index]) {
        questionsWrongCount[index]++;
        studentsPickedWrong[index].push(
          `${studentAnswer.student.firstName} ${studentAnswer.student.middleName} ${studentAnswer.student.lastName}`,
        );
      } else {
        mostPickedAnswers[index]++;
      }
    });
  });

  const sortedQuestionsWrongCount = questionsWrongCount
    .map((count, index) => ({ count, index }))
    .sort((a, b) => b.count - a.count);

  const topWrongQuestions: QuestionResult[] = sortedQuestionsWrongCount
    .slice(0, topCount)
    .map(({ count, index }) => ({
      index,
      studentCount: count,
      studentNames: studentsPickedWrong[index],
      mostPickedAnswer: mostPickedAnswers[index],
      correctAnswer: correctAnswer[index],
    }));

  return topWrongQuestions;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");

  try {
    const totalStudent = await prisma.studentGrade.count({
      where: { testId: testId! },
    });

    const total = await prisma.studentGrade.aggregate({
      where: { testId: testId! },
      _sum: { numberOfIncorrect: true, numberOfCorrect: true },
    });

    const point = await prisma.studentGrade.aggregate({
      where: { testId: testId! },
      _max: { numberOfCorrect: true },
      _min: { numberOfCorrect: true },
    });

    const studentsAnswerData = await prisma.studentGrade.findMany({
      where: { testId: testId! },
      select: {
        answerIndices: true,
        student: {
          select: {
            lastName: true,
            middleName: true,
            firstName: true,
          },
        },
      },
    });

    const correctAnswerIndices = await prisma.test.findFirst({
      where: { id: testId! },
      select: { answerIndices: true },
    });

    const questionsMostGotRight = getQuestionsMostStudentsGotRight(
      correctAnswerIndices?.answerIndices!,
      studentsAnswerData,
      3,
    );

    const questionsMostGotWrong = getQuestionsMostStudentsGotWrong(
      correctAnswerIndices?.answerIndices!,
      studentsAnswerData,
      3,
    );

    const accuracy = calculateAccuracy(
      total._sum.numberOfCorrect!,
      total._sum.numberOfIncorrect!,
    );

    const average = calculateAverage(totalStudent, total._sum.numberOfCorrect!);

    const responseData = {
      accuracy,
      average,
      highest: point._max.numberOfCorrect!,
      lowest: point._min.numberOfCorrect!,
      questionsMostGotRight,
      questionsMostGotWrong,
    };

    return NextResponse.json(responseData);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
