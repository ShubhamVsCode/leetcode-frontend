"use client";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/textEditor/theme-provider";
import { ModeToggle } from "@/components/smallComponents/ThemeSwicher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leetcode",
  description: "A leetcode clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <title>Leetcode</title>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed left-3 bottom-3 z-20">
            <ModeToggle />
          </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
