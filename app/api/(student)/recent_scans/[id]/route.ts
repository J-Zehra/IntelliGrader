/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const studentGrade = await prisma.studentGrade.findMany({
      where: { test: { classId: id } },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      include: {
        student: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
            rollNumber: true,
          },
        },
        test: {
          select: {
            answerIndices: true,
            testParts: true,
          },
        },
      },
    });

    return NextResponse.json(studentGrade);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
