/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");
  const rollNumber = parseInt(searchParams.get("rollNumber")!, 10);
  console.log("DATA", testId);
  console.log("DATA", rollNumber);
  try {
    const studentGrade = await prisma.studentGrade.findFirst({
      where: {
        AND: [
          {
            testId: testId!,
          },
          {
            rollNumber: rollNumber!,
          },
        ],
      },
      include: {
        test: {
          select: {
            answerIndices: true,
            numberOfChoices: true,
          },
        },
      },
    });

    return NextResponse.json(studentGrade);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
