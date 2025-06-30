"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  isScrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();

  // Menu items with translations
  const menuItems = [
    { name: t("picos"), href: "/picos" },
    { name: t("pitaGyros"), href: "/pita-gyros" },
    { name: t("kebabai"), href: "/kebabai" },
    { name: t("uzkandziai"), href: "/uzkandziai" },
    { name: t("gerimai"), href: "/gerimai" },
    { name: t("kava"), href: "/kava" },
    { name: t("ledai"), href: "/ledai" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.div
        className="w-full bg-red-600 fixed top-0 left-0 z-50 overflow-hidden"
        animate={{ height: isScrolled ? 80 : 450 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between h-full">
          {/* === Content when scrolled === */}
          {isScrolled ? (
            <>
              <Link href="/">
                <Image
                  width={60}
                  height={60}
                  priority
                  quality={100}
                  src="https://res.cloudinary.com/daspo1tk3/image/upload/v1751274816/Logo-ProfPizza_d72bmu.png"
                  alt="Prof Pizza Logo"
                />
              </Link>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={
                    "https://res.cloudinary.com/daspo1tk3/image/upload/v1751274871/Banner-LT-1024x171_1_kfzodm.png"
                  }
                  width={200}
                  height={40}
                  alt="Banner LT"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-white text-sm">
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <span>0.00 $</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                    className="fixed top-52 lg:right-10 md:right-2 right-4 bg-black text-white rounded-full p-3 text-lg font-medium hover:bg-gray-800 hover:text-white/90 hover:transform hover:scale-95 transition-all duration-300 w-20 h-20"
                  >
                    <span className="hover:animate-spin">{t("menu")}</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* === Content before scroll === */}
              <div className="flex-1 flex items-center justify-center gap-12">
                <Link href="/">
                  <Image
                    width={100}
                    height={100}
                    priority
                    quality={100}
                    src="https://res.cloudinary.com/daspo1tk3/image/upload/v1751274816/Logo-ProfPizza_d72bmu.png"
                    alt="Prof Pizza Logo"
                  />
                </Link>
                <Link href="/">
                  <Image
                    width={100}
                    height={100}
                    priority
                    quality={100}
                    src="https://res.cloudinary.com/daspo1tk3/image/upload/v1751274803/Logo-KebabPrime_w7ie8q.png"
                    alt="Kebab Prime Logo"
                  />
                </Link>
              </div>
              <div className="flex items-center h-full w-16 mr-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(true)}
                  className="bg-black text-white rounded-full p-5 text-lg font-medium hover:bg-gray-800 hover:text-white/90 hover:transform hover:scale-95 hover:animate-spin transition-all duration-300 w-20 h-20"
                >
                  <span className="hover:animate-spin">{t("menu")}</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <p
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <X className="text-white w-7 h-7 font-bold" />
            </p>

            {/* Header with Logos and Close Button */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center mt-8 -mb-8">
              <div className="flex justify-center items-center space-x-4">
                <Link href="/">
                  <Image
                    width={90}
                    height={90}
                    priority
                    src="https://res.cloudinary.com/daspo1tk3/image/upload/v1751274816/Logo-ProfPizza_d72bmu.png"
                    alt="Prof Pizza Logo"
                  />
                </Link>
                <Link href="/">
                  <Image
                    width={90}
                    height={90}
                    priority
                    src="https://res.cloudinary.com/daspo1tk3/image/upload/v1751274803/Logo-KebabPrime_w7ie8q.png"
                    alt="Kebab Prime Logo"
                  />
                </Link>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-center justify-center flex-1 space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white text-2xl font-medium hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Language Options */}
            <LanguageSwitcher className="text-white text-2xl text-center mb-12" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
