import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeWrapper from "@/components/wrappers/themeWrapper";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: "IntelliGrader",
  description:
    "IntelliGrader: Advancing Test Scoring through AI and Image Recognition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeWrapper>
          <Header />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
