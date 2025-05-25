"use client"

import React from "react"
import Image from "next/image"

const PizzaSection: React.FC = () => {
  const pizzaItems = [
    {
      image: "/Pizza-1.webp",
      text: ["Paprika", "Alyvuogės", "Rūkyta sūris"],
    },
    {
      image: "/Pizza-2.webp",
      text: ["Mėlyniji svogūnai", "Vytiniai pomidorai", "Šviežias bazilikas"],
    },
    {
      image: "/Pizza-3.webp",
      text: ["Pievagrybiai", "Mēlyniji svogūnai", "Brokoliai"],
    },
  ]

  return (
    <div
      className="w-full bg-[#D4A373] min-h-[400px] flex items-center justify-between px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="flex-1 flex flex-col items-center space-y-8">
        <h2 className="text-gray-800 text-5xl font-semibold">su Virtu kumplion</h2>
        {pizzaItems.map((item, index) => (
          <div key={index} className={`${index === 0 ? "flex flex-row-reverse items-center gap-x-4" : index === 1 ? "flex flex-row gap-4 items-center pl-44" : "flex flex-row-reverse items-center gap-x-4"}`}>
           <div className="flex flex-col gap-y-3">
             <Image
              width={50}
              height={50}
              priority
              quality={100}
              src={index === 0 ? "/1.webp" : index === 1 ? "/2-1.webp" : "/3-1.webp"}
              alt={`Number ${index + 1}`}
              className="object-contain"
            />

            <div className="flex flex-col items-start">
              {item.text.map((line, i) => (
                <span key={i} className="text-black text-sm">
                  {line}
                </span>
              ))}
            </div>
           </div>
            <Image
              width={250}
              height={250}
              priority
              quality={100}
              src={item.image}
              alt={`Pizza ${index + 1}`}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PizzaSection