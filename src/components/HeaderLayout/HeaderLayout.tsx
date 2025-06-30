import type { ReactNode } from "react"
import NavbarLayout from "@/components/shared/NavbarLayout"

interface HeaderLayoutProps {
  children: ReactNode
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
  return <NavbarLayout>{children}</NavbarLayout>
}