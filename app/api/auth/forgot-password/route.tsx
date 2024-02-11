/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PasswordResetEmailTemplate } from "@/components/password-reset-template";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body as { email: string };

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const errorResponse = {
      error: "Invalid Email",
      message: "This email is not registered.",
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const mail = await resend.emails.send({
    from: "ScoreTech <scoretech@intelligrader.org>",
    to: email,
    subject: "Password Reset",
    react: <PasswordResetEmailTemplate id={user.id} />,
  });

  console.log(mail);

  return NextResponse.json(mail);
}
