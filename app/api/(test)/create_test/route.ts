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
      testName,
      parts,
      passingGrade,
      variant,
      format,
    } = body as TestInfo;

    let newTest = {};

    if (format === "Regular") {
      newTest = await prisma.test.create({
        data: {
          answerIndices,
          classId,
          testName: testName.trim(),
          variant,
          format,
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
    } else {
      console.time();
      newTest = await prisma.test.create({
        data: {
          answerIndices,
          classId,
          testName: testName.trim(),
          variant,
          format,
          passingGrade,
          testParts: {
            create: parts.map((part) => {
              return {
                questionType: part.questionType,
                totalNumber: part.totalNumber,
                numberOfChoices: part.numberOfChoices,
                mdatPoints: part.mdatPoints,
              };
            }),
          },
        },
      });
      console.timeEnd();
    }

    return NextResponse.json(newTest);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
