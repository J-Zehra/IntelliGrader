/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { class_id: string } },
) {
  const { class_id } = params;
  console.log(class_id);

  try {
    const testInfo = await prisma.test.findMany({
      where: { classId: class_id },
      include: {
        testParts: true,
      },
    });

    return NextResponse.json(testInfo);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
