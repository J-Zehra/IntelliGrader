import type { Metadata } from "next";
import TestLayoutWrapper from "@/components/layouts/testLayoutWrapper";

export const metadata: Metadata = {
  title: "Class | IntelliGrader",
  description: "IntelliGrader Class ",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TestLayoutWrapper>{children}</TestLayoutWrapper>;
}
