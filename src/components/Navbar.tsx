"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const menuItems = [
  { name: "Picos", href: "/picos" },
  { name: "Pita-Gyros", href: "/pita-gyros" },
  { name: "Kebabai", href: "/kebabai" },
  { name: "Užkandžiai", href: "/uzkandziai" },
  { name: "Gėrimai", href: "/gerimai" },
  { name: "Kava", href: "/kava" },
  { name: "Ledai", href: "/ledai" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Scroll handler to toggle navbar height
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        animate={{
          height: isScrolled ? 80 : 500,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-red-600 flex items-center",
          isScrolled ? "h-[80px] py-4" : "h-[500px]"
        )}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          {isScrolled ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/">
                  <Image
                    width={50}
                    height={50}
                    priority
                    quality={100}
                    src="/Logo-ProfPizza.png"
                    alt="Prof Pizza Logo"
                  />
                </Link>
              </motion.div>

              {/* Center: Delivery Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex-1 flex items-center justify-center"
              >
                <Link href="/">
                  <Image
                    width={200}
                    height={100}
                    priority
                    quality={100}
                    src="/Banner-LT-1024x171.png"
                    alt="Banner Logo with text"
                  />
                </Link>
              </motion.div>

              <div className="flex items-center space-x-2">
                {/* Cart Icon with Price */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center text-white text-sm"
                >
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <span>0.00 $</span>
                </motion.div>

                {/* Menu Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className={`${isScrolled ? "absolute top-60" : ""}`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                    className="bg-black text-white rounded-full p-5 text-lg font-medium hover:bg-gray-800 hover:text-white/90 hover:transform hover:scale-95 hover:animate-spin transition-all duration-300 w-20 h-20"
                  >
                    <span className="hover:animate-spin">meniu</span>
                  </Button>
                </motion.div>
              </div>
            </>
          ) : (
            // Initial state with centered logos
            <div className="flex-1 flex items-center justify-center space-x-12">
              {/* Centered Logos */}
              <Link href="/">
                <Image
                  width={100}
                  height={100}
                  priority
                  quality={100}
                  src="/Logo-ProfPizza.png"
                  alt="Prof Pizza Logo"
                />
              </Link>
              <Link href="/">
                <Image
                  width={100}
                  height={100}
                  priority
                  quality={100}
                  src="/Logo-KebabPrime.png"
                  alt="Kebab Prime Logo"
                />
              </Link>
            </div>
          )}

          {/* Menu Button in Initial State */}
          {!isScrolled && (
            <div className="flex items-center h-16 w-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="bg-black text-white rounded-full p-5 text-lg font-medium hover:bg-gray-800 hover:text-white/90 hover:transform hover:scale-95 hover:animate-spin transition-all duration-300 w-20 h-20"
              >
                <span className="hover:animate-spin">meniu</span>
              </Button>
            </div>
          )}
        </div>
      </motion.nav>

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
                    src="/Logo-ProfPizza.png"
                    alt="Prof Pizza Logo"
                  />
                </Link>
                <Link href="/">
                  <Image
                    width={90}
                    height={90}
                    priority
                    src="/Logo-KebabPrime.png"
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
            <div className="mb-28 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-white text-2xl">
                <span className="hover:text-gray-300 cursor-pointer">LT</span>
                {" | "}
                <span className="hover:text-gray-300 cursor-pointer">EN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
