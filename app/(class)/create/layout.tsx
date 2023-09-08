import type { Metadata } from "next";
import CreateClassLayoutWrapper from "@/components/layouts/createClassLayoutWrapper";

export const metadata: Metadata = {
  title: "Create Class | IntelliGrader",
  description: "IntelliGrader Create Class",
};

export default function CreateClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CreateClassLayoutWrapper>{children}</CreateClassLayoutWrapper>;
}
