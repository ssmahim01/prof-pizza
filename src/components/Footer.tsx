"use client"

import type React from "react"
import Image from "next/image"

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white/90 pt-8 md:pt-10 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-between md:items-start">
        <div className="text-center md:text-left">
          <p className="flex flex-col text-sm sm:text-base gap-y-1 font-semibold">
            <span>Darbo laikas</span>
            <span>11-23 val.</span>
          </p>
        </div>
        <div className="flex flex-col items-center space-y-3 md:space-y-4 order-first md:order-none">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Image
              width={60}
              height={60}
              priority
              quality={100}
              src="/Logo-ProfPizza.png"
              alt="Prof Pizza Logo"
              className="object-contain sm:w-[70px] sm:h-[70px]"
            />
            <Image
              width={60}
              height={60}
              priority
              quality={100}
              src="/Logo-KebabPrime.png"
              alt="Kebab Prime Logo"
              className="object-contain sm:w-[70px] sm:h-[70px]"
            />
          </div>
          <div className="text-white text-base sm:text-lg">
            <span className="hover:text-gray-300 cursor-pointer">LT</span>
            {" | "}
            <span className="hover:text-gray-300 cursor-pointer">EN</span>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="flex flex-col text-sm sm:text-base gap-y-1 font-semibold">
            <span>Ukmergės g. 294, Vilnius</span>
            <span>Tel. 0 5 260 31 00</span>
            <span>El. paštas info@profpizza.lt</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;