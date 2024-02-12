import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
import { Teacher } from "@/utils/types";
import prisma from "@/libs/prismadb";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request) {
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

  // USERNAME VALIDATION
  if (username.length < 6) {
    const errorResponse = {
      error: "Invalid Username.",
      message: "Username should be atleast 6 characters long.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  if (username.length > 30) {
    const errorResponse = {
      error: "Invalid Username.",
      message: "Username too long. It should not exceed 30 characters.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  // EMAIL VALIDATION
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    const errorResponse = {
      error: "Invalid Email.",
      message: "Please provide a valid email address.",
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // PASSWORD VALIDATION
  if (password.length < 8) {
    const errorResponse = {
      error: "Invalid Password.",
      message: "Password must be at least 8 characters long.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  if (password.length > 30) {
    const errorResponse = {
      error: "Invalid Password.",
      message: "Password too long. It must not exceed 30 characters.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasCapitalLetter) {
    const errorResponse = {
      error: "Invalid Password.",
      message: "Password should have atleast one capital letter.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  if (!hasSpecialCharacter) {
    const errorResponse = {
      error: "Invalid Password.",
      message: "Password should have atleast one special character.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
  }

  if (!hasNumber) {
    const errorResponse = {
      error: "Invalid Password.",
      message: "Password should have atleast one number.",
    };
    return NextResponse.json(errorResponse, {
      status: 400,
    });
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
