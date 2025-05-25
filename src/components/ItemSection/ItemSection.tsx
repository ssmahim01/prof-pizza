"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ItemSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-[#d37864dd] h-[400px] py-52 flex justify-center items-center gap-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex justify-center items-center gap-6">
        <Image
          width={300}
          height={300}
          priority
          quality={100}
          src="/pizza-image.png"
          alt="Mix Pizza"
          className="object-contain"
        />
      </div>
      <div className="flex items-center justify-center text-center">
        <p className="flex flex-col space-y-3">
          <span className="text-4xl font-semibold text-gray-800">
            MIX <br /> pica
          </span>
          <span className="text-xl font-medium">
            Susikurk <br /> skaniausią
          </span>
        </p>
      </div>
      <div className="w-16" />
    </motion.div>
  );
};

export default ItemSection;
