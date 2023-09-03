import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Test | IntelliGrader",
  description: "IntelliGrader Create Test",
};

export default function TestSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
