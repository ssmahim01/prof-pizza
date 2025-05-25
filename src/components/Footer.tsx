"use client";

import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white/90 pt-8 pb-52">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-12">
        <div className="flex justify-between items-center gap-10">
          <p className="flex flex-col text-lg gap-y-2 font-semibold">
            <span>Darbo laikas</span>
            <span>11-23 val.</span>
          </p>

          {/* Logos */}
          <div className="flex flex-col -mb-16">
            <div className="flex items-center justify-center gap-4">
              <Image
                width={90}
                height={90}
                priority
                quality={100}
                src="/Logo-ProfPizza.png"
                alt="Prof Pizza Logo"
                className="object-contain"
              />
              <Image
                width={90}
                height={90}
                priority
                quality={100}
                src="/Logo-KebabPrime.png"
                alt="Kebab Prime Logo"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center space-x-6 pt-12">
              <div className="text-white text-xl">
                <span className="hover:text-gray-300 cursor-pointer">LT</span>
                {" | "}
                <span className="hover:text-gray-300 cursor-pointer">EN</span>
              </div>
            </div>
          </div>

          <p className="flex flex-col text-lg gap-y-2 font-semibold">
            <span>Ukmergės g. 294, Vilnius</span>
            <span>Tel. 0 5 260 31 00</span>
            <span>El. paštas info@profpizza.lt</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
