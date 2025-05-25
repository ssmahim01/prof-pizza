"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import ItemSection from "@/components/ItemSection/ItemSection"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="group">
      {/* Fixed Container for Navbar and ItemSection */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          height: isScrolled ? 60 : 700,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Navbar isScrolled={isScrolled} />
        {isScrolled || !isScrolled ? <ItemSection /> : null}
      </motion.div>

      {/* Main Content */}
      <div className="pt-[700px]">
        Home page
      </div>
    </div>
  )
}