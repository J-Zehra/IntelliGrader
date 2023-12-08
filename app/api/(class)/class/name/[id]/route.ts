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
    const testInfo = await prisma.class.findFirst({
      where: { id },
      select: { course: true },
    });

    return NextResponse.json(testInfo);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
