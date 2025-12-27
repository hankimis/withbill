import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Withbill / JAN Master Insight",
  description: "영상 제출 → AI 진단 리포트 → 코치 선택/구매 → 피드백 열람 (데모)"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built for <strong>Withbill / JAN Master Insight</strong> Demo.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}


