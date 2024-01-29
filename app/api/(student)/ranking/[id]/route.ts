/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const students = await prisma.student.findMany({
      where: { classId: id },
      select: {
        id: true,
        studentGrade: {
          select: {
            numberOfCorrect: true,
            numberOfIncorrect: true,
          },
        },
        lastName: true,
        firstName: true,
        middleName: true,
      },
    });

    const studentRanking: {
      studentName: string;
      accuracy: number;
      id: string;
    }[] = [];

    students.forEach((student) => {
      const { lastName, firstName, middleName, studentGrade } = student;
      const totalCorrect = studentGrade.reduce(
        (sum, subject) => sum + subject.numberOfCorrect,
        0,
      );
      const totalIncorrect = studentGrade.reduce(
        (sum, subject) => sum + subject.numberOfIncorrect,
        0,
      );

      const accuracy =
        totalCorrect + totalIncorrect !== 0
          ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
          : 0;

      const studentName = `${lastName}, ${firstName} ${
        middleName ? `${middleName.charAt(0)}.` : ""
      }`;
      studentRanking.push({ studentName, accuracy, id: student.id });
    });

    studentRanking.sort((a, b) => b.accuracy - a.accuracy);

    return NextResponse.json(studentRanking);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
