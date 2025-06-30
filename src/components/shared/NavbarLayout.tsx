"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useScrollDetection } from "@/hooks/useScrollDetection"
import Navbar from "../Navbar"
import Footer from "../Footer"

interface NavbarLayoutProps {
  children: React.ReactNode
}

export default function NavbarLayout({ children }: NavbarLayoutProps) {
  const isScrolled = useScrollDetection(100)

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      {/* Dynamic spacing that adjusts based on navbar height */}
      <motion.div
        animate={{ paddingTop: isScrolled ? 80 : 370 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
      <Footer />
    </>
  )
}