import type { Metadata } from "next";
import AuthLayoutWrapper from "@/components/layouts/authLayoutWrapper";

export const metadata: Metadata = {
  title: "Auth | IntelliGrader",
  description: "IntelliGrader Authentication ",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
