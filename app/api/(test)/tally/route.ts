/* eslint-disable no-multi-assign */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");

  try {
    const test = await prisma.test.findUnique({
      where: { id: testId! },
      include: {
        studentGrade: {
          include: {
            student: true,
          },
        },
        testParts: true,
      },
    });

    if (!test) {
      throw new Error("Test not found");
    }

    const { testParts } = test;
    const totalQuestions = testParts.reduce(
      (sum, part) => sum + part.totalNumber,
      0,
    );
    const questionTally: number[] = Array(totalQuestions).fill(0);

    test.studentGrade.forEach((studentGrade) => {
      studentGrade.answerIndices.forEach((answer, index) => {
        if (answer === test.answerIndices[index]) {
          questionTally[index] = questionTally[index] += 1;
        }
      });
    });

    console.log(questionTally);
    return NextResponse.json({ tally: questionTally });
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
