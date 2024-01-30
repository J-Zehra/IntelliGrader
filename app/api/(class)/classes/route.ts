/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import options from "../../auth/options";

export async function PUT(request: Request) {
  const session = await getServerSession(options);
  const user = session?.user as unknown as any;
  const body = await request.json();
  const { searchTerm } = body as { searchTerm: string };

  try {
    const classes = await prisma.class.findMany({
      where: {
        teacherId: user.id,
        OR: [
          { program: { contains: searchTerm || "", mode: "insensitive" } },
          { course: { contains: searchTerm || "", mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(classes);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 400 });
  }
}
