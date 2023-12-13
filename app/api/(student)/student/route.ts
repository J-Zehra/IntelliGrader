/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const rollNumber = parseInt(searchParams.get("rollNumber")!, 10);
  try {
    const student = await prisma.student.findFirst({
      where: {
        AND: [
          {
            classId: classId!,
          },
          {
            rollNumber: rollNumber!,
          },
        ],
      },
    });

    return NextResponse.json(student);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
