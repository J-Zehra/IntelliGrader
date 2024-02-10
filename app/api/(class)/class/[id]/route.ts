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
    const classInfo = await prisma.class.findFirst({
      where: { id },
      select: { course: true, program: true },
    });

    const totalStudents = await prisma.student.count({
      where: { classId: id },
    });

    const totalTests = await prisma.test.count({
      where: { classId: id },
    });

    const data = {
      program: classInfo?.program,
      course: classInfo?.course,
      totalStudents,
      totalTests,
    };

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
