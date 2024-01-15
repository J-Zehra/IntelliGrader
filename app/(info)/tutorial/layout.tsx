import type { Metadata } from "next";
import TutorialLayoutWrapper from "@/components/layouts/tutorialLayoutWrapper";

export const metadata: Metadata = {
  title: "Tutorial | IntelliGrader",
  description: "IntelliGrader Tutorial ",
};

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TutorialLayoutWrapper>{children}</TutorialLayoutWrapper>;
}
