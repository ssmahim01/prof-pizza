"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Navbar from "@/components/Navbar";
import ItemSection from "@/components/ItemSection/ItemSection";
import PizzaSection from "@/components/PizzaSection/PizzaSection";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
      {/* Fixed Container for Navbar and ItemSection */}
      <motion.div
        className=""
        animate={{
          height: isScrolled ? 60 : 700,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* <Navbar isScrolled={isScrolled} /> */}
        {!isScrolled ? (
          <ItemSection />
        ) : isScrolled ? (
          <>
            <ItemSection />
          </>
        ) : null}
      </motion.div>

      {/* Main Content */}
      <div className="mt-[350px]">
        <PizzaSection />
      </div>
    </>
  );
}
