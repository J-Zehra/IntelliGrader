import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
import { Teacher } from "@/utils/types";
import prisma from "@/libs/prismadb";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

// eslint-disable-next-line import/prefer-default-export
export async function PUT(request: Request) {
  const body = await request.json();
  const newUserData: Teacher = body;

  const { username, email, password } = newUserData;

  // CHECK IF THE INPUT IS NOT EMPTY
  if (!email || !password || !username) {
    const errorResponse = {
      error: "Incomplete Fields.",
      message: "Please fill all the fields.",
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  if (password.length < 6) {
    const errorResponse = {
      error: "Invalid Password.",
      message: "Password must be at least 8 characters long.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  // CHECK IF THE EMAIL IS VALID
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    const errorResponse = {
      error: "Invalid Email.",
      message: "Please provide a valid email address.",
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // CHECK IF USERNAME EXISTS
  const usernameExist = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (usernameExist) {
    const errorResponse = {
      error: "Username Conflict.",
      message: "The chosen username is already taken.",
    };
    return NextResponse.json(errorResponse, { status: 409 });
  }

  // CHECK IF EMAIL EXISTS
  const emailExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExist) {
    const errorResponse = {
      error: "Email Conflict.",
      message: "The chosen email is already taken.",
    };
    return NextResponse.json(errorResponse, { status: 409 });
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  // REGISTER USER
  const user = await prisma.user.create({
    data: {
      username,
      email: email.toLowerCase(),
      emailVerified: false,
      password: hashedPassword,
      scannerSettings: { create: { shading_threshold: 45 } },
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "ScoreTech <scoretech@intelligrader.org>",
    to: email,
    subject: "Email Verification",
    react: <EmailTemplate id={user.id} />,
  });

  return NextResponse.json(user);
}
