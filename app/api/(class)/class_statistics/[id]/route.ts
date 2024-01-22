/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const calculatePassingRate = (
  totalStudents: number,
  totalTests: number,
  totalPassed: number,
) => {
  return Math.round((totalPassed / (totalStudents * totalTests)) * 100);
};

const calculateAccuracy = (
  totalTestNumber: number,
  totalNumberOfCorrect: number,
  totalStudent: number,
) => {
  return Math.round(
    (totalNumberOfCorrect / (totalStudent * totalTestNumber)) * 100,
  );
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const totalStudents = await prisma.studentGrade.count({
      where: { test: { classId: id } },
    });

    const totalTests = await prisma.test.count({
      where: {
        classId: id,
      },
    });

    const totalPassed = await prisma.studentGrade.count({
      where: { AND: [{ test: { classId: id } }, { status: "Passed" }] },
    });

    const totalTestsNumber = await prisma.testPart.aggregate({
      where: { test: { classId: id } },
      _sum: { totalNumber: true },
    });

    const totalNumberOfCorrect = await prisma.studentGrade.aggregate({
      where: { test: { classId: id } },
      _sum: { numberOfCorrect: true },
    });

    console.log(totalTestsNumber._sum, totalNumberOfCorrect._sum, totalTests);

    const passingRate = calculatePassingRate(
      totalStudents,
      totalTests,
      totalPassed,
    );

    const accuracy = calculateAccuracy(
      totalTestsNumber._sum.totalNumber!,
      totalNumberOfCorrect._sum.numberOfCorrect!,
      totalStudents,
    );

    const data = {
      passingRate,
      accuracy,
    };

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
