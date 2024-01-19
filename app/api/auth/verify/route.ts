/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body as { id: string };

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        emailVerified: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
