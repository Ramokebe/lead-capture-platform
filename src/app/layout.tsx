import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GTMProvider from "@/components/analytics/GTMProvider";
import GTMNoScript from "@/components/analytics/GTMNoScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Money Hub | Find Out What You Qualify For",
  description:
    "My Money Hub connects you with personal loans, debt counselling, store cards and insurance. Real financial solutions — no guesswork, no pressure.",
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
