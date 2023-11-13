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
    const { course, section, year, program, students, variant } =
      body as ClassInfo;

    const newClass = await prisma.class.create({
      data: {
        course,
        section,
        year,
        program,
        variant,
        teacherId: user.id,
        students: {
          create: students.map((student) => {
            return {
              firstName: student.firstName,
              lastName: student.lastName,
              middleName: student.middleName,
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
