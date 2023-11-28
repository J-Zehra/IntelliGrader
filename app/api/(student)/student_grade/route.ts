/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");
  const rollNumber = parseInt(searchParams.get("rollNumber")!, 10);
  try {
    const studentGrade = await prisma.studentGrade.findFirst({
      where: {
        AND: [
          {
            testId: testId!,
          },
          {
            student: { rollNumber: rollNumber! },
          },
        ],
      },
      include: {
        test: {
          select: {
            answerIndices: true,
            testParts: true,
          },
        },
        student: true,
      },
    });

    return NextResponse.json(studentGrade);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
