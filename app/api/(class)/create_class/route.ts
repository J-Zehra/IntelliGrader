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
    const body = await request.json();
    const { course, section, year, program, students, variant, schoolLevel } =
      body as ClassInfo;

    const newClass = await prisma.class.create({
      data: {
        course: course.trim(),
        section: section.trim(),
        year,
        schoolLevel,
        program: program.trim(),
        variant,
        teacherId: user.id,
        students: {
          create: students.map((student) => {
            return {
              firstName: student.firstName.trim(),
              lastName: student.lastName.trim(),
              middleName: student.middleName.trim(),
              rollNumber: student.rollNumber,
            };
          }),
        },
      },
      include: { students: true },
    });

    return NextResponse.json(newClass);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
