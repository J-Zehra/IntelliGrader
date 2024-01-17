/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

type StudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { students, classId } = body as {
      students: StudentName[];
      classId: string;
    };

    const lastRollNumber = await prisma.student.aggregate({
      where: { classId },
      _max: { rollNumber: true },
    });

    let number = lastRollNumber._max.rollNumber;

    const newStudent = await prisma.student.createMany({
      data: students.map((student) => {
        number! += 1;
        return {
          firstName: student.firstName,
          lastName: student.lastName,
          middleName: student.middleName,
          rollNumber: number!,
          classId,
        };
      }),
    });

    return NextResponse.json(newStudent);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
