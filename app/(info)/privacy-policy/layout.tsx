import TermsOfServiceLayoutWrapper from "@/components/layouts/termsOfServiceLayoutWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | IntelliGrader",
  description: "IntelliGrader Tutorial ",
};

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TermsOfServiceLayoutWrapper>{children}</TermsOfServiceLayoutWrapper>;
}
