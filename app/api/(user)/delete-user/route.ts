/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import options from "../../auth/options";

export async function DELETE() {
  const session = await getServerSession(options);
  const user = session?.user as unknown as any;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json(deletedUser);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
