"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={className}>
      <span
        onClick={() => setLanguage("lt")}
        className={`cursor-pointer ${
          language === "lt" ? "text-purple-400" : "hover:text-gray-300"
        }`}
      >
        LT
      </span>{" "}
      |{" "}
      <span
        onClick={() => setLanguage("en")}
        className={`cursor-pointer ${
          language === "en" ? "text-purple-400" : "hover:text-gray-300"
        }`}
      >
        EN
      </span>
    </div>
  );
}
