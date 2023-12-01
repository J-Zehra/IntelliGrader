/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const courseName = await prisma.class.findFirst({
      where: { id },
      select: { course: true },
    });

    const totalStudents = await prisma.student.count({
      where: { classId: id },
    });

    const totalTests = await prisma.test.count({
      where: { classId: id },
    });

    const totalTestSCompleted = await prisma.test.aggregate({
      where: { status: "Completed" },
      _count: { status: true },
    });

    const data = {
      course: courseName?.course,
      totalStudents,
      totalTests,
      totalTestSCompleted: totalTestSCompleted._count.status,
    };

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
