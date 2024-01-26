/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { ClassInfo } from "@/utils/types";
import options from "../../../auth/options";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);
    const user = session?.user as unknown as any;
    const body = await request.json();
    const { course, section, year, program } = body as ClassInfo;

    const classExist = await prisma.class.findFirst({
      where: {
        AND: [
          { teacherId: user.id },
          {
            program: program.trim(),
          },
          {
            year,
          },
          {
            section: section.trim(),
          },
          {
            course: course.trim(),
          },
        ],
      },
    });

    if (classExist) {
      const errorResponse = {
        error: "Class Conflict.",
        message:
          "A class with a similar program, year, section, and course already exist.",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    return NextResponse.json({});
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
