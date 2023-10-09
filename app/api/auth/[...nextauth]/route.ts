import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId:
        "13924501660-3h5p4ohcv8v7qnaeuuemoubvdop4pga6.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please fill all the fields");
          }
        }

        // CHECK IF USER EXIST
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error("Email is not registered.");
        }

        // CHECK IF THE PASSWORD MATCHES
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password!,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect Password.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
