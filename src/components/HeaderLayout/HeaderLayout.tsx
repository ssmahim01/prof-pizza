"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <main className={`${isScrolled ? "" : "mt-[370px]"}`}>{children}</main>
      <Footer />
    </>
  );
};

export default HeaderLayout;