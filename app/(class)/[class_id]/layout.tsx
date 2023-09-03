import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class | IntelliGrader",
  description: "IntelliGrader Class ",
};

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
