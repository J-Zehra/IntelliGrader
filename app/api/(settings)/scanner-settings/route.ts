/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import options from "../../auth/options";

export async function GET() {
  const session = await getServerSession(options);
  const user = session?.user as unknown as any;

  try {
    const settings = await prisma.scannerSettings.findFirst({
      where: {
        teacherId: user.id,
      },
    });

    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
