/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testName, classId } = body as { testName: string; classId: string };

    const testExist = await prisma.test.findFirst({
      where: {
        AND: [{ classId }, { testName: testName.trim() }],
      },
    });

    if (testExist) {
      const errorResponse = {
        error: "Test Name Conflict.",
        message: "A test with a similar test name already exist.",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    return NextResponse.json({});
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
