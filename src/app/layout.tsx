import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderLayout from "@/components/HeaderLayout/HeaderLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prof Pizza",
  description: "Prof Pizza and Kebab Prime",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderLayout>{children}</HeaderLayout>
      </body>
    </html>
  );
}