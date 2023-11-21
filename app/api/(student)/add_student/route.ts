/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { StudentInfo } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { student, classId } = body as {
      student: StudentInfo;
      classId: string;
    };

    const newStudent = await prisma.student.create({
      data: {
        firstName: student.firstName,
        lastName: student.lastName,
        middleName: student.middleName,
        rollNumber: student.rollNumber,
        classId,
      },
    });

    return NextResponse.json(newStudent);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
