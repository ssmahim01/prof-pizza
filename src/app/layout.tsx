import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderLayout from "@/components/HeaderLayout/HeaderLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ReduxProvider from "@/components/providers/ReduxProvider";

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
        <ReduxProvider>
          <LanguageProvider>
            <HeaderLayout>{children}</HeaderLayout>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
