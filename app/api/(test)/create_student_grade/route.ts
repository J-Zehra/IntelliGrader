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

    const newGrade = await prisma.studentGrade.createMany({
      data: grades.map((grade) => {
        return {
          processedImage: grade.processed_image,
          answerIndices: grade.answer_indices,
          numberOfCorrect: grade.number_of_correct,
          numberOfIncorrect: grade.number_of_incorrect,
          rollNumber: grade.roll_number,
          testId,
        };
      }),
    });

    return NextResponse.json(newGrade);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
