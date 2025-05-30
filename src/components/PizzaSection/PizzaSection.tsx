"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PizzaDetailModal, {
  type PizzaModalData,
} from "../PizzaDetailModal/PizzaDetailModal";
const pizzaItemsData: PizzaModalData[] = [
  {
    id: "p1",
    itemNumberForModal: 1,
    modalImage: "/Pizza-1.webp",
    baseIngredientsModal: [
      "Virtas kumpis ®",
      "Paprika ®",
      "Alyvuogės ®",
      "Rūkytas sūris ®",
      "Mozzarella sūris ®",
    ],
    baseSauceModal: "Pomidorų padažas ®",
    sizes: [
      { name: "Snack", price: 4.9 },
      { name: "30 cm", price: 9.9 },
      { name: "40 cm", price: 13.9 },
    ],
    defaultSizeName: "30 cm",
    sauces: [
      { name: "Česnakinis", price: 0 },
      { name: "Pikantiškas", price: 0.7 },
      { name: "Aštrus", price: 0.7 },
      { name: "BBQ", price: 0.7 },
      { name: "Ketčupas", price: 0.7 },
    ],
    defaultSauceName: "Česnakinis",
    extras: [
      // Left column
      { name: "Mozzarella sūris", price: 1.25, column: "left" },
      { name: "Virtas kumpis", price: 1.25, column: "left" },
      { name: "Salamis", price: 1.25, column: "left" },
      { name: "Šoninė", price: 1.25, column: "left" },
      { name: "Malta mėsa", price: 1.25, column: "left" },
      { name: "Jautienos kumpeliai", price: 1.25, column: "left" },
      { name: "Vištiena", price: 1.25, column: "left" },
      { name: "Krevetės", price: 1.25, column: "left" },
      // Right column
      { name: "Pievagrybiai", price: 0.65, column: "right" },
      { name: "Paprika", price: 0.65, column: "right" },
      { name: "Porai", price: 0.65, column: "right" },
      { name: "Pomidorai vyšniniai", price: 0.65, column: "right" },
      { name: "Baklažanai", price: 0.65, column: "right" },
      { name: "Svogūnai mėlynieji", price: 0.65, column: "right" },
      { name: "Ananasai", price: 0.65, column: "right" },
      { name: "Alyvuogės", price: 0.65, column: "right" },
      { name: "Agurkai", price: 0.65, column: "right" },
      { name: "Svogūnėliai", price: 0.65, column: "right" },
      { name: "Džiovinti pomidorai", price: 0.65, column: "right" },
      { name: "Brokoliai", price: 0.65, column: "right" },
      { name: "Jalapenai", price: 0.65, column: "right" },
      { name: "Bazilikas", price: 0.65, column: "right" },
      { name: "Špinatai", price: 0.65, column: "right" },
      { name: "Rukola", price: 0.65, column: "right" },
      { name: "Rūkytas sūris", price: 0.65, column: "right" },
    ],
    maxFreeLeftExtras: 2,
    maxFreeRightExtras: 3,
  },
  // Add data for Pizza 2 (itemNumberForModal: 2)
  {
    id: "p2",
    itemNumberForModal: 2,
    modalImage: "/Pizza-2.webp",
    baseIngredientsModal: [
      "Mėlyniji svogūnai ®",
      "Vytiniai pomidorai ®",
      "Šviežias bazilikas ®",
      "Feta sūris ®",
    ],
    baseSauceModal: "Pesto padažas ®",
    sizes: [
      { name: "Snack", price: 5.2 },
      { name: "30 cm", price: 10.5 },
      { name: "40 cm", price: 14.5 },
    ],
    defaultSizeName: "30 cm",
    sauces: [
      { name: "Pesto", price: 0 },
      { name: "Česnakinis", price: 0.7 },
      { name: "Aštrus", price: 0.7 },
    ],
    defaultSauceName: "Pesto",
    extras: [
      // Different extras
      { name: "Alyvuogės", price: 1.25, column: "left" },
      { name: "Rukola", price: 1.25, column: "left" },
      { name: "Saulėje dž. pomidorai", price: 0.65, column: "right" },
    ],
    maxFreeLeftExtras: 1,
    maxFreeRightExtras: 1,
  },
  // Add data for Pizza 3 (itemNumberForModal: 3)
  {
    id: "p3",
    itemNumberForModal: 3,
    modalImage: "/Pizza-3.webp",
    baseIngredientsModal: [
      "Pievagrybiai ®",
      "Mēlyniji svogūnai ®",
      "Brokoliai ®",
      "Šoninė ®",
    ],
    baseSauceModal: "Grietinėlės padažas ®",
    sizes: [
      { name: "Snack", price: 5.0 },
      { name: "30 cm", price: 10.0 },
      { name: "40 cm", price: 14.2 },
    ],
    defaultSizeName: "30 cm",
    sauces: [
      { name: "Grietinėlės", price: 0 },
      { name: "Česnakinis", price: 0.7 },
      { name: "Barbekiu", price: 0.7 },
    ],
    defaultSauceName: "Grietinėlės",
    extras: [
      { name: "Papildomi pievagrybiai", price: 1.25, column: "left" },
      { name: "Rūkyta vištiena", price: 1.25, column: "left" },
      { name: "Marinuoti agurkai", price: 0.65, column: "right" },
      { name: "Krapai", price: 0.65, column: "right" },
    ],
    maxFreeLeftExtras: 1,
    maxFreeRightExtras: 1,
  },
];

// Original list item structure for display purposes
const pizzaListDisplayItems = [
  {
    image: "/Pizza-1.webp",
    numberImage: "/1.webp",
    text: ["Paprika", "Alyvuogės", "Rūkyta sūris"],
    modalDataId: "p1",
  },
  {
    image: "/Pizza-2.webp",
    numberImage: "/2-1.webp",
    text: ["Mėlyniji svogūnai", "Vytiniai pomidorai", "Šviežias bazilikas"],
    modalDataId: "p2",
  },
  {
    image: "/Pizza-3.webp",
    numberImage: "/3-1.webp",
    text: ["Pievagrybiai", "Mēlyniji svogūnai", "Brokoliai"],
    modalDataId: "p3",
  },
];

const PizzaSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizzaDataForModal, setSelectedPizzaDataForModal] =
    useState<PizzaModalData | null>(null);

  const handleItemClick = (modalDataId: string) => {
    const pizzaDetail = pizzaItemsData.find((p) => p.id === modalDataId);
    if (pizzaDetail) {
      setSelectedPizzaDataForModal(pizzaDetail);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="w-full bg-[#D4A373] min-h-[400px] flex items-center justify-center px-2 sm:px-4 lg:px-8 py-10 md:py-20">
        <div className="w-full max-w-3xl flex flex-col items-center space-y-6 md:space-y-8">
          {" "}
          {/* Max width for content area */}
          <h2 className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
            {" "}
            su Virtu kumpiu
          </h2>
          {pizzaListDisplayItems.map((item, index) => (
            <Dialog
              key={item.modalDataId}
              onOpenChange={(open) => {
                if (!open) setSelectedPizzaDataForModal(null);
              }}
            >
              <DialogTrigger
                asChild
                onClick={() => handleItemClick(item.modalDataId)}
              >
                {/* Applying responsive classes to your existing structure */}
                <div
                  className={`w-full flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-md hover:bg-black/5 cursor-pointer
                                 ${
                                   index % 2 !== 0
                                     ? "flex-row-reverse md:flex-row-reverse"
                                     : "flex-row md:flex-row"
                                 } 
                                 md:justify-start md:pl-${
                                   index % 2 !== 0 ? "0" : "12"
                                 } lg:pl-${index % 2 !== 0 ? "0" : "44"}`}
                >
                  <div className="flex flex-col items-center gap-y-2 sm:gap-y-3 flex-shrink-0">
                    {" "}
                    {/* Centered number and text */}
                    <Image
                      width={40}
                      height={40}
                      priority
                      quality={100}
                      src={item.numberImage || "/placeholder.svg"}
                      alt={`Numeris ${index + 1}`}
                      className="object-contain w-8 h-8 sm:w-10 sm:h-10"
                    />
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      {" "}
                      {/* Centered text on mobile */}
                      {item.text.map((line, i) => (
                        <span key={i} className="text-black text-xs sm:text-sm">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-grow flex justify-center md:flex-grow-0 md:justify-start">
                    {" "}
                    {/* Image container */}
                    <Image
                      width={200}
                      height={200}
                      priority
                      quality={100}
                      src={item.image || "/placeholder.svg"}
                      alt={`Pica ${index + 1}`}
                      className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-[200px] lg:w-[250px] md:h-auto rounded-md"
                    />
                  </div>
                </div>
              </DialogTrigger>
            </Dialog>
          ))}
        </div>
      </div>
      {/* Modal is rendered here, controlled by state */}
      <PizzaDetailModal
        pizzaData={selectedPizzaDataForModal}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default PizzaSection;
