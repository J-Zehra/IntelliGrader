import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export const OPTIONS: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
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
        const user = await prisma.teacher.findUnique({
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
          user.password,
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

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
