/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const calculatePassingRate = (totalTest: number, totalPassed: number) => {
  return Math.round((totalPassed / totalTest) * 100);
};

const calculateAccuracy = (totalCorrect: number, totalQuestions: number) => {
  return Math.round((totalCorrect / totalQuestions) * 100);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const studentId = searchParams.get("studentId");

  try {
    const studentGrade = await prisma.studentGrade.findMany({
      where: {
        AND: [
          {
            test: { classId: classId! },
          },
          {
            student: { id: studentId! },
          },
        ],
      },
      include: {
        test: {
          select: {
            id: true,
            testName: true,
            answerIndices: true,
            testParts: true,
          },
        },
        student: true,
      },
    });

    const passedTests = await prisma.studentGrade.count({
      where: {
        AND: [
          {
            test: { classId: classId! },
          },
          {
            student: { id: studentId! },
          },
          { status: "Passed" },
        ],
      },
    });

    const totalCorrect = await prisma.studentGrade.aggregate({
      where: {
        AND: [
          {
            test: { classId: classId! },
          },
          {
            student: { id: studentId! },
          },
        ],
      },
      _sum: { totalScore: true },
    });

    const totalQuestions = await prisma.studentGrade.aggregate({
      where: {
        AND: [
          {
            test: { classId: classId! },
          },
          {
            student: { id: studentId! },
          },
        ],
      },
      _sum: { totalPerfectScore: true },
    });

    const passingRate = calculatePassingRate(studentGrade.length, passedTests);
    const accuracy = calculateAccuracy(
      totalCorrect._sum.totalScore!,
      totalQuestions._sum.totalPerfectScore!,
    );

    console.log(totalCorrect._sum.totalScore);
    console.log(totalQuestions._sum.totalPerfectScore);

    return NextResponse.json({ grade: studentGrade, passingRate, accuracy });
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
