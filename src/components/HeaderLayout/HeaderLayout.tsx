"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface HeaderLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children, locale }) => {
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
      <Navbar locale={locale} isScrolled={isScrolled} />
      <main className={`${isScrolled ? "" : "mt-[370px]"}`}>{children}</main>
      <Footer locale={locale} />
    </>
  );
};

export default HeaderLayout;
