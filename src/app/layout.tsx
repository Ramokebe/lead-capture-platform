import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GTMProvider from "@/components/analytics/GTMProvider";
import GTMNoScript from "@/components/analytics/GTMNoScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check What You Qualify For | Apply Now",
  description:
    "Find out what financial products you qualify for in minutes. Secure, fast, and POPIA compliant.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <GTMProvider />
        <GTMNoScript />
        {children}
      </body>
    </html>
  );
}
