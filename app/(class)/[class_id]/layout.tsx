import type { Metadata } from "next";
import ClassLayoutWrapper from "@/components/layouts/classLayoutWrapper";

export const metadata: Metadata = {
  title: "Class | IntelliGrader",
  description: "IntelliGrader Class ",
};

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClassLayoutWrapper>{children}</ClassLayoutWrapper>;
}
