"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PizzaDetailModal from "../PizzaDetailModal/PizzaDetailModal";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PizzaModalData, PizzaDisplayItem } from "@/types/pizza";

const PizzaSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizzaDataForModal, setSelectedPizzaDataForModal] =
    useState<PizzaModalData | null>(null);
  const { t } = useLanguage();

  // Pizza data with proper structure matching the interfaces
  const pizzaItemsData: PizzaModalData[] = [
    {
      id: "p1",
      itemNumberForModal: 1,
      name: "Pizza Classica",
      img: "/Pizza-1.webp",
      modalImage: "/Pizza-1.webp",
      desc:
        t("cookedHam") +
        ", " +
        t("paprika") +
        ", " +
        t("olives") +
        ", " +
        t("smokedCheese"),
      baseIngredientsModal: [
        t("cookedHam") + " ®",
        t("paprika") + " ®",
        t("olives") + " ®",
        t("smokedCheese") + " ®",
        t("mozzarellaCheese") + " ®",
      ],
      baseSauceModal: t("tomatoSauce") + " ®",
      price: [4.9, 9.9, 13.9],
      sizes: [
        { name: "Snack", price: 4.9 },
        { name: "30 cm", price: 9.9 },
        { name: "40 cm", price: 13.9 },
      ],
      defaultSizeName: "30 cm",
      sauces: [
        { name: t("garlicSauce"), price: 0 },
        { name: t("spicySauce"), price: 0.7 },
        { name: t("hotSauce"), price: 0.7 },
        { name: t("bbqSauce"), price: 0.7 },
        { name: t("ketchupSauce"), price: 0.7 },
      ],
      defaultSauceName: t("garlicSauce"),
      extras: [
        // Left column
        {
          id: "mozzarella",
          name: t("mozzarellaCheese"),
          text: t("mozzarellaCheese"),
          price: 1.25,
          column: "left",
        },
        {
          id: "ham",
          name: t("cookedHam"),
          text: t("cookedHam"),
          price: 1.25,
          column: "left",
        },
        {
          id: "salami",
          name: t("salamis"),
          text: t("salamis"),
          price: 1.25,
          column: "left",
        },
        {
          id: "bacon",
          name: t("bacon"),
          text: t("bacon"),
          price: 1.25,
          column: "left",
        },
        {
          id: "groundMeat",
          name: t("groundMeat"),
          text: t("groundMeat"),
          price: 1.25,
          column: "left",
        },
        {
          id: "beef",
          name: t("beefChips"),
          text: t("beefChips"),
          price: 1.25,
          column: "left",
        },
        {
          id: "chicken",
          name: t("chicken"),
          text: t("chicken"),
          price: 1.25,
          column: "left",
        },
        {
          id: "shrimp",
          name: t("shrimp"),
          text: t("shrimp"),
          price: 1.25,
          column: "left",
        },
        // Right column
        {
          id: "mushrooms",
          name: t("mushrooms"),
          text: t("mushrooms"),
          price: 0.65,
          column: "right",
        },
        {
          id: "paprika",
          name: t("paprika"),
          text: t("paprika"),
          price: 0.65,
          column: "right",
        },
        {
          id: "leeks",
          name: t("leeks"),
          text: t("leeks"),
          price: 0.65,
          column: "right",
        },
        {
          id: "tomatoes",
          name: t("cherryTomatoes"),
          text: t("cherryTomatoes"),
          price: 0.65,
          column: "right",
        },
        {
          id: "eggplant",
          name: t("eggplant"),
          text: t("eggplant"),
          price: 0.65,
          column: "right",
        },
        {
          id: "blueOnions",
          name: t("blueOnions"),
          text: t("blueOnions"),
          price: 0.65,
          column: "right",
        },
        {
          id: "pineapple",
          name: t("pineapple"),
          text: t("pineapple"),
          price: 0.65,
          column: "right",
        },
        {
          id: "olives",
          name: t("olives"),
          text: t("olives"),
          price: 0.65,
          column: "right",
        },
        {
          id: "cucumbers",
          name: t("cucumbers"),
          text: t("cucumbers"),
          price: 0.65,
          column: "right",
        },
        {
          id: "scallions",
          name: t("scallions"),
          text: t("scallions"),
          price: 0.65,
          column: "right",
        },
        {
          id: "driedTomatoes",
          name: t("driedTomatoes"),
          text: t("driedTomatoes"),
          price: 0.65,
          column: "right",
        },
        {
          id: "broccoli",
          name: t("broccoli"),
          text: t("broccoli"),
          price: 0.65,
          column: "right",
        },
        {
          id: "jalapenos",
          name: t("jalapenos"),
          text: t("jalapenos"),
          price: 0.65,
          column: "right",
        },
        {
          id: "basil",
          name: t("basil"),
          text: t("basil"),
          price: 0.65,
          column: "right",
        },
        {
          id: "spinach",
          name: t("spinach"),
          text: t("spinach"),
          price: 0.65,
          column: "right",
        },
        {
          id: "arugula",
          name: t("arugula"),
          text: t("arugula"),
          price: 0.65,
          column: "right",
        },
        {
          id: "smokedCheese",
          name: t("smokedCheese"),
          text: t("smokedCheese"),
          price: 0.65,
          column: "right",
        },
      ],
      maxFreeLeftExtras: 2,
      maxFreeRightExtras: 3,
    },
    {
      id: "p2",
      itemNumberForModal: 2,
      name: "Pizza Mediterranea",
      img: "/Pizza-2.webp",
      modalImage: "/Pizza-2.webp",
      desc:
        t("blueOnions") +
        ", " +
        t("cherryTomatoes") +
        ", " +
        t("freshBasil") +
        ", " +
        t("fetaCheese"),
      baseIngredientsModal: [
        t("blueOnions") + " ®",
        t("cherryTomatoes") + " ®",
        t("freshBasil") + " ®",
        t("fetaCheese") + " ®",
      ],
      baseSauceModal: t("pestoSauce") + " ®",
      price: [5.2, 10.5, 14.5],
      sizes: [
        { name: "Snack", price: 5.2 },
        { name: "30 cm", price: 10.5 },
        { name: "40 cm", price: 14.5 },
      ],
      defaultSizeName: "30 cm",
      sauces: [
        { name: "Pesto", price: 0 },
        { name: t("garlicSauce"), price: 0.7 },
        { name: t("hotSauce"), price: 0.7 },
      ],
      defaultSauceName: "Pesto",
      extras: [
        {
          id: "olives2",
          name: t("olives"),
          text: t("olives"),
          price: 1.25,
          column: "left",
        },
        {
          id: "arugula2",
          name: t("arugula"),
          text: t("arugula"),
          price: 1.25,
          column: "left",
        },
        {
          id: "sundriedTomatoes",
          name: t("sundriedTomatoes"),
          text: t("sundriedTomatoes"),
          price: 0.65,
          column: "right",
        },
      ],
      maxFreeLeftExtras: 1,
      maxFreeRightExtras: 1,
    },
    {
      id: "p3",
      itemNumberForModal: 3,
      name: "Pizza Rustica",
      img: "/Pizza-3.webp",
      modalImage: "/Pizza-3.webp",
      desc:
        t("mushrooms") +
        ", " +
        t("blueOnions") +
        ", " +
        t("broccoli") +
        ", " +
        t("bacon"),
      baseIngredientsModal: [
        t("mushrooms") + " ®",
        t("blueOnions") + " ®",
        t("broccoli") + " ®",
        t("bacon") + " ®",
      ],
      baseSauceModal: t("creamSauce") + " ®",
      price: [5.0, 10.0, 14.2],
      sizes: [
        { name: "Snack", price: 5.0 },
        { name: "30 cm", price: 10.0 },
        { name: "40 cm", price: 14.2 },
      ],
      defaultSizeName: "30 cm",
      sauces: [
        { name: t("creamSauce"), price: 0 },
        { name: t("garlicSauce"), price: 0.7 },
        { name: "Barbekiu", price: 0.7 },
      ],
      defaultSauceName: t("creamSauce"),
      extras: [
        {
          id: "additionalMushrooms",
          name: t("additionalMushrooms"),
          text: t("additionalMushrooms"),
          price: 1.25,
          column: "left",
        },
        {
          id: "smokedChicken",
          name: t("smokedChicken"),
          text: t("smokedChicken"),
          price: 1.25,
          column: "left",
        },
        {
          id: "pickledCucumbers",
          name: t("pickledCucumbers"),
          text: t("pickledCucumbers"),
          price: 0.65,
          column: "right",
        },
        {
          id: "dill",
          name: t("dill"),
          text: t("dill"),
          price: 0.65,
          column: "right",
        },
      ],
      maxFreeLeftExtras: 1,
      maxFreeRightExtras: 1,
    },
  ];

  // Display items with proper typing
  const pizzaListDisplayItems: PizzaDisplayItem[] = [
    {
      image: "/Pizza-1.webp",
      numberImage: "/1.webp",
      text: [t("paprika"), t("olives"), t("smokedCheese")],
      modalDataId: "p1",
    },
    {
      image: "/Pizza-2.webp",
      numberImage: "/2-1.webp",
      text: [t("blueOnions"), t("cherryTomatoes"), t("freshBasil")],
      modalDataId: "p2",
    },
    {
      image: "/Pizza-3.webp",
      numberImage: "/3-1.webp",
      text: [t("mushrooms"), t("blueOnions"), t("broccoli")],
      modalDataId: "p3",
    },
  ];

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
          <h2 className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
            {t("withCookedHam")}
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
                      {item.text.map((line, i) => (
                        <span key={i} className="text-black text-xs sm:text-sm">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-grow flex justify-center md:flex-grow-0 md:justify-start">
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
      <PizzaDetailModal
        pizzaData={selectedPizzaDataForModal}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default PizzaSection;
