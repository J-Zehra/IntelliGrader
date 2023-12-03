/* eslint-disable no-multi-assign */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

interface StudentGrade {
  student: string;
  answerIndices: number[]; // assuming this is an array of numbers
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("testId");

  try {
    const test = await prisma.test.findUnique({
      where: { id: testId! },
      include: {
        studentGrade: {
          include: {
            student: true,
          },
        },
        testParts: true,
      },
    });

    const totalStudents = await prisma.studentGrade.count({
      where: { testId: testId! },
    });

    if (!test) {
      throw new Error("Test not found");
    }

    const { testParts } = test;
    const totalQuestions = testParts.reduce(
      (sum, part) => sum + part.totalNumber,
      0,
    );

    const questionTally: number[] = Array(totalQuestions).fill(0);

    const studentGrades: StudentGrade[] = Array(totalStudents).fill({
      student: "",
      answerIndices: [],
    });

    test.studentGrade.forEach((studentGrade, i) => {
      const { firstName, lastName, middleName } = studentGrade.student;
      studentGrades[i].student = `${lastName}, ${firstName} ${
        middleName ? middleName.charAt(0) : ""
      }.`;

      studentGrade.answerIndices.forEach((answer, index) => {
        if (answer === test.answerIndices[index]) {
          studentGrades[i].answerIndices[index] = 1;
          questionTally[index] += 1; // remove unnecessary assignment
        } else {
          studentGrades[i].answerIndices[index] = 0;
        }
      });
    });

    return NextResponse.json({
      tally: questionTally,
      totalStudents,
      studentGrades,
    });
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
