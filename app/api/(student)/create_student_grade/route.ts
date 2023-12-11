/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { FetchedGradeInfo } from "@/utils/types";

const isPassed = (passingGrade: number, rate: number) => {
  if (rate > passingGrade) return true;
  return false;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { grades, testId } = body as {
      grades: FetchedGradeInfo[];
      testId: string;
    };

    const newGrades = await Promise.all(
      grades.map(async (grade) => {
        const student = await prisma.student.findUnique({
          where: { rollNumber: grade.roll_number },
        });

        if (!student) {
          return null;
        }

        const existingStudentGrade = await prisma.studentGrade.findFirst({
          where: {
            AND: [{ testId }, { student: { rollNumber: grade.roll_number } }],
          },
        });

        const test = await prisma.test.findFirst({
          where: { id: testId! },
          select: { passingGrade: true },
        });

        const rate = Math.round(
          (grade.number_of_correct / grade.answer_indices.length) * 100,
        );

        if (existingStudentGrade) {
          return prisma.studentGrade.update({
            where: { id: existingStudentGrade.id },
            data: {
              processedImage: grade.processed_image,
              answerIndices: grade.answer_indices,
              numberOfCorrect: grade.number_of_correct,
              numberOfIncorrect: grade.number_of_incorrect,
              status: isPassed(test?.passingGrade!, rate) ? "Passed" : "Failed",
              testId,
              studentId: student.id,
            },
          });
        }

        return prisma.studentGrade.create({
          data: {
            processedImage: grade.processed_image,
            answerIndices: grade.answer_indices,
            numberOfCorrect: grade.number_of_correct,
            numberOfIncorrect: grade.number_of_incorrect,
            status: isPassed(test?.passingGrade!, rate) ? "Passed" : "Failed",
            testId,
            studentId: student.id,
          },
        });
      }),
    );

    const validGrades = newGrades.filter((grade) => grade !== null);

    return NextResponse.json(validGrades);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
