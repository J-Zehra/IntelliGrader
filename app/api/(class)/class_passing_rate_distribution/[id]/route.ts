/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const totalStudent = await prisma.student.count({
      where: { classId: id },
    });
    const tests = await prisma.test.findMany({
      where: { classId: id },
      select: {
        testName: true,
        _count: {
          select: { studentGrade: { where: { status: "Passed" } } },
        },
      },
    });

    const passingGradeDistribution: {
      testName: string;
      passingRate: number;
    }[] = [];

    tests.forEach((test) => {
      const rate = Math.round((test._count.studentGrade / totalStudent) * 100);
      passingGradeDistribution.push({
        passingRate: rate,
        testName: test.testName,
      });
    });

    return NextResponse.json(passingGradeDistribution);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
