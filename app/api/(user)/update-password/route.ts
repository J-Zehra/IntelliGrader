/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, id } = body as { password: string; id: string };

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      const errorResponse = {
        error: "No User",
        message: "User does not exist.",
      };
      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

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
    const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
      password,
    );
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

    // CHECK IF THE PASSWORD MATCHES
    const passwordMatch = await bcrypt.compare(password, user.password!);

    if (passwordMatch) {
      const errorResponse = {
        error: "Same Password.",
        message: "New password can't be the same as the old one.",
      };
      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
