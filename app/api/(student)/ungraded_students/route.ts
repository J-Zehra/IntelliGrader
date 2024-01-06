/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const testId = searchParams.get("testId");

  try {
    const studentsWithoutGrade = await prisma.student.findMany({
      where: {
        AND: [
          { classId: classId! },
          {
            NOT: {
              studentGrade: {
                some: {
                  testId: testId!,
                },
              },
            },
          },
        ],
      },
      include: {
        studentGrade: true,
      },
    });

    return NextResponse.json(studentsWithoutGrade);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
