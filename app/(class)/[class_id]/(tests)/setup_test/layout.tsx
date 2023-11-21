import type { Metadata } from "next";
import TestSetupLayoutWrapper from "@/components/layouts/testSetupLayoutWrapper";

export const metadata: Metadata = {
  title: "Setup Test | IntelliGrader",
  description: "IntelliGrader Create Test",
};

export default function TestSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TestSetupLayoutWrapper>{children}</TestSetupLayoutWrapper>;
}
