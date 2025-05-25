"use client";

import React from "react";
import ItemSection from "@/components/ItemSection/ItemSection";
import PizzaSection from "@/components/PizzaSection/PizzaSection";

export default function Home() {
  return (
    <>
      <div className="pt-[80px]">
        <ItemSection />
        <PizzaSection />
      </div>
    </>
  );
}
