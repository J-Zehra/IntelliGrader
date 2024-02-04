/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const testId = searchParams.get("testId");

  try {
    const studentPassed = await prisma.studentGrade.count({
      where: {
        AND: [
          {
            testId: testId!,
          },
          { status: "Passed" },
        ],
      },
    });

    const studentFailed = await prisma.studentGrade.count({
      where: {
        AND: [
          {
            testId: testId!,
          },
          { status: "Failed" },
        ],
      },
    });

    const ungradedStudents = await prisma.student.count({
      where: {
        AND: [
          { classId: classId! },
          {
            NOT: {
              studentGrade: {
                some: {
                  testId: testId!,
                },
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({
      studentPassed,
      studentFailed,
      ungradedStudents,
    });
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
