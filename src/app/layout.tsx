import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import HeaderLayout from "@/components/HeaderLayout/HeaderLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prof Pizza",
  description: "Prof Pizza and Kebab Prime",
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "lt" }]
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <HeaderLayout locale={locale}>{children}</HeaderLayout>
      </body>
    </html>
  )
}
