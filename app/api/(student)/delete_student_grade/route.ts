/* eslint-disable no-multi-assign */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");
  const rollNumber = parseInt(searchParams.get("rollNumber")!, 10);

  try {
    const grade = await prisma.studentGrade.findFirst({
      where: {
        AND: [{ testId: testId! }, { student: { rollNumber } }],
      },
    });

    const deletedGrade = await prisma.studentGrade.delete({
      where: { id: grade?.id },
    });

    return NextResponse.json(deletedGrade);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
