/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { QuestionPart } from "@/utils/types";

const calculateAccuracy = (
  totalCorrect: number,
  totalNumberOfQuestions: number,
  totalStudent: number,
) => {
  return Math.round(
    (totalCorrect / (totalNumberOfQuestions * totalStudent)) * 100,
  );
};

const calculatePassingRate = (totalStudent: number, totalPassed: number) => {
  return Math.round((totalPassed / totalStudent) * 100);
};

const getNumberOfChoices = (
  testParts: QuestionPart[],
  questionNumber: number,
): number | undefined => {
  let cumulativeTotal = 0;

  for (const part of testParts) {
    cumulativeTotal += part.totalNumber;

    if (questionNumber <= cumulativeTotal) {
      return part.numberOfChoices;
    }
  }

  // Return undefined if the questionNumber is not found in the testParts array
  return undefined;
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
    student: { lastName: string; firstName: string };
  }[],
  questionParts: QuestionPart[],
): QuestionResult[] | undefined => {
  if (studentsAnswers.length < 1) {
    return;
  }

  const questionsRightCount: number[] = Array(correctAnswer.length).fill(0);

  // Create an array to store the names of students who picked the correct answer for each question
  const studentsPickedRight: string[][] = correctAnswer.map(() => []);

  studentsAnswers.forEach((studentAnswer) => {
    studentAnswer.answerIndices.forEach((answer, index) => {
      if (answer === correctAnswer[index]) {
        questionsRightCount[index]++;
        studentsPickedRight[index].push(
          `${studentAnswer.student.firstName} ${studentAnswer.student.lastName}`,
        );
      }
    });
  });

  // Find the highest frequency of correct answers
  const maxCount = Math.max(...questionsRightCount);

  // Filter questions with the highest frequency
  const topRightQuestions: QuestionResult[] = questionsRightCount
    .map((count, index) => ({ count, index }))
    .filter(({ count }) => count === maxCount)
    .map(({ count, index }) => ({
      index,
      studentCount: count,
      studentNames: studentsPickedRight[index],
      correctAnswer: correctAnswer[index],
      numberOfChoices: getNumberOfChoices(questionParts, index),
    }));

  return topRightQuestions;
};

const getQuestionsMostStudentsGotWrong = (
  correctAnswer: number[],
  studentsAnswers: {
    answerIndices: number[];
    student: { lastName: string; firstName: string };
  }[],
  questionParts: QuestionPart[],
): QuestionResult[] | undefined => {
  if (studentsAnswers.length < 1) {
    return;
  }

  const questionsWrongCount: number[] = Array(correctAnswer.length).fill(0);
  const mostPickedAnswers: number[] = Array(correctAnswer.length).fill(0);

  // Create an array to store the names of students who picked the wrong answer for each question
  const studentsPickedWrong: string[][] = correctAnswer.map(() => []);

  studentsAnswers.forEach((studentAnswer) => {
    studentAnswer.answerIndices.forEach((answer, index) => {
      if (answer !== correctAnswer[index]) {
        questionsWrongCount[index]++;
        studentsPickedWrong[index].push(
          `${studentAnswer.student.firstName} ${studentAnswer.student.lastName}`,
        );
      } else {
        mostPickedAnswers[index]++;
      }
    });
  });

  // Find the highest frequency of wrong answers
  const maxCount = Math.max(...questionsWrongCount);

  // Filter questions with the highest frequency
  const topWrongQuestions: QuestionResult[] = questionsWrongCount
    .map((count, index) => ({ count, index }))
    .filter(({ count }) => count === maxCount)
    .map(({ count, index }) => ({
      index,
      studentCount: count,
      studentNames: studentsPickedWrong[index],
      mostPickedAnswer: mostPickedAnswers[index],
      correctAnswer: correctAnswer[index],
      numberOfChoices: getNumberOfChoices(questionParts, index),
    }));

  return topWrongQuestions;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");

  try {
    const totalStudent = await prisma.studentGrade.count({
      where: { testId: testId! },
      orderBy: {
        student: { lastName: "asc" },
      },
    });

    const total = await prisma.studentGrade.aggregate({
      where: { testId: testId! },
      _sum: { numberOfIncorrect: true, numberOfCorrect: true },
    });

    const totalPassed = await prisma.studentGrade.count({
      where: { AND: [{ testId: testId! }, { status: "Passed" }] },
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
            firstName: true,
          },
        },
      },
    });

    const correctAnswerIndices = await prisma.test.findFirst({
      where: { id: testId! },
      select: { answerIndices: true, testParts: true },
    });

    const questionsMostGotRight = getQuestionsMostStudentsGotRight(
      correctAnswerIndices?.answerIndices!,
      studentsAnswerData,
      correctAnswerIndices?.testParts as QuestionPart[],
    );

    const questionsMostGotWrong = getQuestionsMostStudentsGotWrong(
      correctAnswerIndices?.answerIndices!,
      studentsAnswerData,
      correctAnswerIndices?.testParts as QuestionPart[],
    );

    const accuracy = calculateAccuracy(
      total._sum.numberOfCorrect!,
      correctAnswerIndices?.answerIndices.length!,
      totalStudent,
    );

    const passingRate = calculatePassingRate(totalStudent, totalPassed);

    const responseData = {
      accuracy,
      passingRate,
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
