/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import options from "../../auth/options";

export async function PUT() {
  const session = await getServerSession(options);
  const user = session?.user as unknown as any;
  try {
    const classes = await prisma.class.findMany({
      where: {
        teacherId: user.id,
      },
    });

    return NextResponse.json(classes);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
