/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { TestInfo } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answerIndices, classId, testName, parts, passingGrade, variant } =
      body as TestInfo;

    const testExist = await prisma.test.findFirst({
      where: {
        testName,
      },
    });

    if (!testExist) {
      const errorResponse = {
        error: "Test Name Conflict.",
        message: "A test with a similar test name already exist.",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const newTest = await prisma.test.create({
      data: {
        answerIndices,
        classId,
        testName,
        variant,
        passingGrade,
        testParts: {
          create: parts.map((part) => {
            return {
              questionType: part.questionType,
              totalNumber: part.totalNumber,
              numberOfChoices: part.numberOfChoices,
              points: part.points,
            };
          }),
        },
      },
    });

    return NextResponse.json(newTest);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
