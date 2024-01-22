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

    const studentExist = await prisma.student.findFirst({
      where: {
        AND: [
          { firstName: { contains: student.firstName.trim() } },
          { lastName: { contains: student.lastName.trim() } },
          { middleName: { contains: student.middleName.trim() } },
        ],
      },
    });

    if (studentExist) {
      const errorResponse = {
        error: "Student name conflict.",
        message: "Student with the same name already exist.",
      };
      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

    const newStudent = await prisma.student.create({
      data: {
        firstName: student.firstName.trim(),
        lastName: student.lastName.trim(),
        middleName: student.middleName.trim(),
        rollNumber: student.rollNumber,
        classId,
      },
    });

    return NextResponse.json(newStudent);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
