/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { ClassInfo } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { course, section, year, subject } = body as ClassInfo;
    console.log(course, section, year, subject);

    const newClass = await prisma.class.create({
      data: {
        course,
        section,
        year,
        subject,
        teacherId: "Teacher2",
      },
    });

    return NextResponse.json(newClass);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
