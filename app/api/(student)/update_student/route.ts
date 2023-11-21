/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { FetchedStudentInfo } from "@/utils/types";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, id, middleName } = body as FetchedStudentInfo;

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        firstName,
        middleName,
        lastName,
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
