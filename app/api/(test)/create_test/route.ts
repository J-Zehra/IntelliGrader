/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { TestInfo } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      answerIndices,
      classId,
      numberOfChoices,
      points,
      testName,
      totalQuestions,
    } = body as TestInfo;

    console.log(
      answerIndices,
      classId,
      numberOfChoices,
      points,
      testName,
      totalQuestions,
    );

    const newTest = await prisma.test.create({
      data: {
        answerIndices,
        classId,
        numberOfChoices,
        points,
        testName,
        totalQuestions,
      },
    });

    return NextResponse.json(newTest);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
