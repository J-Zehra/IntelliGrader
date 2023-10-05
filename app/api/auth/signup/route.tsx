import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
import { Teacher } from "@/utils/types";
import prisma from "@/libs/prismadb";

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
  const usernameExist = await prisma.teacher.findUnique({
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
  const emailExist = await prisma.teacher.findUnique({
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
  const user = await prisma.teacher.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
