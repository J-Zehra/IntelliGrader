/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { ClassInfo } from "@/utils/types";
import options from "../../auth/options";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);
    const user = session?.user as unknown as any;
    console.log("session", session);
    const body = await request.json();
    const { course, section, year, program, students, variant } =
      body as ClassInfo;
    console.log(course, section, year, program, students);

    const newClass = await prisma.class.create({
      data: {
        course,
        section,
        year,
        program,
        variant,
        teacherId: user.id,
        classStudents: {
          create: students.map((student) => {
            return {
              student: {
                create: {
                  firstName: student.firstName,
                  lastName: student.lastName,
                  middleName: student.middleName,
                  rollNumber: student.rollNumber,
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
