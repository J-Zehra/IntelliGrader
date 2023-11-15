/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { FetchedGradeInfo } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { grades, testId } = body as {
      grades: FetchedGradeInfo[];
      testId: string;
    };

    const newGrades = await Promise.all(
      grades.map(async (grade) => {
        // Step 1: Fetch the student by rollNumber to get the studentId
        const student = await prisma.student.findUnique({
          where: { rollNumber: grade.roll_number },
        });

        if (!student) {
          return NextResponse.json(
            {
              message: `Student with rollNumber ${grade.roll_number} not found.`,
            },
            { status: 404 },
          );
        }

        // Step 2: Check if the student is already graded
        const existingGrade = await prisma.studentGrade.findFirst({
          where: {
            studentId: student.id,
            testId,
          },
        });

        if (existingGrade) {
          return NextResponse.json(
            {
              message: `Student with rollNumber ${grade.roll_number} is already graded.`,
            },
            { status: 400 },
          );
        }

        // Step 3: Create the StudentGrade record with the obtained studentId
        return prisma.studentGrade.create({
          data: {
            processedImage: grade.processed_image,
            answerIndices: grade.answer_indices,
            numberOfCorrect: grade.number_of_correct,
            numberOfIncorrect: grade.number_of_incorrect,
            testId,
            studentId: student.id,
          },
        });
      }),
    );

    return NextResponse.json(newGrades);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
