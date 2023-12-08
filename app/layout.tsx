import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeWrapper from "@/components/wrappers/themeWrapper";
import Header from "@/components/header";
import StateWrapper from "@/components/wrappers/stateWrapper";
import QueryWrapper from "@/components/wrappers/queryWrapper";
import SessionWrapper from "@/components/wrappers/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
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
        <SpeedInsights />
        <ThemeWrapper>
          <SessionWrapper>
            <StateWrapper>
              <QueryWrapper>
                <Header />
                {children}
              </QueryWrapper>
            </StateWrapper>
          </SessionWrapper>
        </ThemeWrapper>
      </body>
    </html>
  );
}
