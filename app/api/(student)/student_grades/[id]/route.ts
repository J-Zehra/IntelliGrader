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
      where: { testId: id },
      orderBy: {
        numberOfCorrect: "desc",
      },
      include: {
        student: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
            rollNumber: true,
          },
        },
      },
    });

    return NextResponse.json(studentGrade);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
