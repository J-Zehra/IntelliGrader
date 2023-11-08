/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { ClassInfo } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { course, section, year, program, students } = body as ClassInfo;
    console.log(course, section, year, program, students);

    const newClass = await prisma.class.create({
      data: {
        course,
        section,
        year,
        program,
        teacherId: "Teacher2",
        classStudents: {
          create: students.map((student) => {
            return {
              student: {
                create: {
                  firstName: student.firstName,
                  lastName: student.lastName,
                  middleName: student.middleName,
                  rollNumber: student.rollNumber,
                  testId: "test1",
                },
              },
            };
          }),
        },
      },
      include: { classStudents: { include: { student: true } } },
    });

    return NextResponse.json(newClass);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
