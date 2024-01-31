import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeWrapper from "@/components/wrappers/themeWrapper";
import Header from "@/components/header";
import StateWrapper from "@/components/wrappers/stateWrapper";
import QueryWrapper from "@/components/wrappers/queryWrapper";
import SessionWrapper from "@/components/wrappers/sessionWrapper";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: "/favicon.svg",
  title: "IntelliGrader",
  authors: { name: "ScoreTech" },
  keywords: [
    "Intelligrader",
    "paper checker",
    "computer vision",
    "automated grading",
    "feedback generation",
    "performance analytics",
    "education technology",
    "efficient grading",
    "student learning",
    "teaching tools",
    "online education",
    "web application",
    "educational software",
    "grading automation",
    "paper assessment",
    "digital assessment",
  ],
  description:
    "Discover the efficiency of Intelligrader, your go-to paper checker utilizing cutting-edge computer vision technology. Experience seamless grading with automated error detection, feedback generation, and insightful performance analytics. Elevate your assessment process effortlessly with Intelligrader's precision and convenience. Try it now for a smarter way to grade papers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
