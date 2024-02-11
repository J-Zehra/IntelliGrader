/* eslint-disable import/prefer-default-export */
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import options from "../../auth/options";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { threshold } = body as { threshold: number };
    const session = await getServerSession(options);
    const user = session?.user as unknown as any;

    const newThreshold = await prisma.scannerSettings.update({
      where: {
        teacherId: user.id,
      },
      data: {
        shading_threshold: threshold,
      },
    });

    return NextResponse.json(newThreshold);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
