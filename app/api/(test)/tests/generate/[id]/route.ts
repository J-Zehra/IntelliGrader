/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const testInfo = await prisma.test.findFirst({
      where: { id },
      select: {
        testParts: {
          select: {
            questionType: true,
            numberOfChoices: true,
            totalNumber: true,
          },
        },
        testName: true,
        class: {
          select: {
            students: true,
            course: true,
            program: true,
            year: true,
            section: true,
          },
        },
      },
    });

    return NextResponse.json(testInfo);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
