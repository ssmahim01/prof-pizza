"use client"

import { usePathname, useRouter } from "next/navigation"

interface LanguageSwitcherProps {
  currentLocale: string
  className?: string
}

export default function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return

    // Remove the current locale from the pathname
    const segments = pathname.split("/")
    segments[1] = newLocale

    const newPath = segments.join("/")
    router.push(newPath)
  }

  return (
    <div className={className}>
      <span
        onClick={() => switchLanguage("lt")}
        className={`cursor-pointer ${currentLocale === "lt" ? "text-purple-400" : "hover:text-gray-300"}`}
      >
        LT
      </span>{" "}
      |{" "}
      <span
        onClick={() => switchLanguage("en")}
        className={`cursor-pointer ${currentLocale === "en" ? "text-purple-400" : "hover:text-gray-300"}`}
      >
        EN
      </span>
    </div>
  )
}