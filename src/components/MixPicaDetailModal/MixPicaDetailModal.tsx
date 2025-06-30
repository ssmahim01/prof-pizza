"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MixPicaData {
  name: string;
  image: string;
  description: string;
  baseSauce: string;
  basePrice: number;
  sizes: { name: string; priceModifier: number; diameter: string }[];
  sauces: { name: string; price: number }[];
  extras: { name: string; price: number; category?: "left" | "right" }[];
}

interface MixPicaDetailModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const MixPicaDetailModal: React.FC<MixPicaDetailModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { t } = useLanguage();

  // Static data for MIX Pica with translations
  const mixPicaDetails: MixPicaData = {
    name: t("mixPizza"),
    image: "/pizza-image.png",
    description: `5 ${t("ingredients")} (2+3)`,
    baseSauce: t("tomatoSauce") + " ®",
    basePrice: 12.99,
    sizes: [
      { name: "Snack", priceModifier: -2.0, diameter: "20cm" },
      { name: "30 cm", priceModifier: 0, diameter: "30cm" },
      { name: "40 cm", priceModifier: 2.5, diameter: "40cm" },
    ],
    sauces: [
      { name: t("garlicSauce"), price: 0 },
      { name: t("spicySauce"), price: 0.65 },
      { name: t("hotSauce"), price: 1.25 },
      { name: t("bbqSauce"), price: 0.65 },
      { name: t("ketchupSauce"), price: 0.65 },
    ],
    extras: [
      // Left column from image
      { name: t("mozzarellaCheese"), price: 1.0, category: "left" },
      { name: t("cookedHam"), price: 1.0, category: "left" },
      { name: t("salamis"), price: 1.0, category: "left" },
      { name: t("bacon"), price: 1.0, category: "left" },
      { name: t("groundMeat"), price: 1.5, category: "left" },
      { name: t("beefChips"), price: 1.5, category: "left" },
      { name: t("chicken"), price: 1.5, category: "left" },
      { name: t("shrimp"), price: 2.0, category: "left" },
      // Right column from image
      { name: t("mushrooms"), price: 0.8, category: "right" },
      { name: t("paprika"), price: 0.8, category: "right" },
      { name: t("leeks"), price: 0.8, category: "right" },
      { name: t("cherryTomatoes"), price: 1.0, category: "right" },
      { name: t("eggplant"), price: 1.0, category: "right" },
      { name: t("blueOnions"), price: 0.8, category: "right" },
      { name: t("pineapple"), price: 1.0, category: "right" },
      { name: t("olives"), price: 0.8, category: "right" },
      { name: t("cucumbers"), price: 0.8, category: "right" },
      { name: t("scallions"), price: 0.8, category: "right" },
      { name: t("driedTomatoes"), price: 1.2, category: "right" },
      { name: t("broccoli"), price: 1.0, category: "right" },
      { name: t("jalapenos"), price: 1.0, category: "right" },
      { name: t("basil"), price: 0.5, category: "right" },
      { name: t("spinach"), price: 0.8, category: "right" },
      { name: t("arugula"), price: 0.8, category: "right" },
      { name: t("smokedCheese"), price: 1.2, category: "right" },
    ],
  };

  const pizza = mixPicaDetails;
  const [currentSize, setCurrentSize] = useState(
    pizza.sizes.find((s) => s.diameter === "30cm") || pizza.sizes[0]
  );
  const [currentSauce, setCurrentSauce] = useState(
    pizza.sauces.find((s) => s.name === t("garlicSauce")) || pizza.sauces[0]
  );
  const [currentExtras, setCurrentExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = pizza.basePrice + currentSize.priceModifier;
    if (currentSauce.name !== t("garlicSauce")) {
      price += currentSauce.price;
    }

    let freeExtrasCount = 0;
    const maxFreeExtras = 2;

    currentExtras.forEach((extraName) => {
      const extra = pizza.extras.find((e) => e.name === extraName);
      if (extra) {
        if (freeExtrasCount < maxFreeExtras) {
          freeExtrasCount++;
        } else {
          price += extra.price;
        }
      }
    });
    setTotalPrice(price * quantity);
  }, [currentSize, currentSauce, currentExtras, quantity, pizza, t]);

  const formatPrice = (price: number) => price.toFixed(2) + " €";

  const handleExtraToggle = (extraName: string) => {
    setCurrentExtras((prev) =>
      prev.includes(extraName)
        ? prev.filter((e) => e !== extraName)
        : [...prev, extraName]
    );
  };

  const extrasLeft = pizza.extras.filter((e) => e.category === "left");
  const extrasRight = pizza.extras.filter((e) => e.category === "right");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-md lg:max-w-lg w-full p-0 m-0 max-h-[95vh] flex flex-col bg-transparent border-none shadow-none outline-none ring-0 focus:ring-0">
        <DialogHeader className="bg-black text-white p-3 flex flex-row items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo-ProfPizza.png"
              alt="Prof Pizza"
              width={25}
              height={25}
              className="sm:w-[30px] sm:h-[30px]"
            />
          </div>
        </DialogHeader>

        <div className="bg-amber-400 p-3 sm:p-4 flex-grow overflow-y-auto space-y-2 sm:space-y-3 rounded-b-lg">
          <div className="relative">
            <div className="flex items-start gap-2">
              <Image
                src={pizza.image || "/placeholder.svg"}
                alt={pizza.name}
                width={120}
                height={120}
                className="rounded-md object-contain sm:w-[150px] sm:h-[150px]"
              />
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {pizza.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {pizza.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {pizza.baseSauce}
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-sm sm:text-base font-bold p-1 text-center leading-tight shadow-md">
              {formatPrice(totalPrice)}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {pizza.sizes.map((size) => (
                <Button
                  key={size.name}
                  variant={
                    currentSize.name === size.name ? "default" : "outline"
                  }
                  onClick={() => setCurrentSize(size)}
                  className={`h-auto py-1 px-2 text-[10px] sm:text-xs rounded-full ${
                    currentSize.name === size.name
                      ? "bg-gray-100 text-gray-800 border-none"
                      : "text-gray-700 border-gray-700 bg-transparent hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  {size.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-gray-700 mb-1 mt-2 text-center">
              {t("sauce")}
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
              {pizza.sauces.map((sauce) => (
                <Button
                  key={sauce.name}
                  variant={
                    currentSauce.name === sauce.name ? "default" : "outline"
                  }
                  onClick={() => setCurrentSauce(sauce)}
                  className={`h-auto py-1 px-2 text-[10px] sm:text-xs rounded-full ${
                    currentSauce.name === sauce.name
                      ? "bg-gray-100 text-gray-800 border-none"
                      : "text-gray-700 border-gray-700 bg-transparent hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  {sauce.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-gray-700 mb-1 mt-2 text-center">
              {t("extras")}
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {/* Left Column Extras */}
              <div className="space-y-1">
                {extrasLeft.map((extra) => (
                  <Button
                    key={extra.name}
                    variant={
                      currentExtras.includes(extra.name) ? "default" : "outline"
                    }
                    onClick={() => handleExtraToggle(extra.name)}
                    className={`w-full h-auto py-1 px-2 text-[10px] sm:text-xs rounded-full justify-start truncate ${
                      currentExtras.includes(extra.name)
                        ? "bg-gray-100 text-gray-800 border-none"
                        : "text-gray-700 border-gray-700 bg-transparent hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    {extra.name}
                  </Button>
                ))}
              </div>
              {/* Right Column Extras */}
              <div className="space-y-1">
                {extrasRight.map((extra) => (
                  <Button
                    key={extra.name}
                    variant={
                      currentExtras.includes(extra.name) ? "default" : "outline"
                    }
                    onClick={() => handleExtraToggle(extra.name)}
                    className={`w-full h-auto py-1 px-2 text-[10px] sm:text-xs rounded-full justify-start truncate ${
                      currentExtras.includes(extra.name)
                        ? "bg-gray-100 text-gray-800 border-none"
                        : "text-gray-700 border-gray-700 bg-transparent hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    {extra.name}
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 text-center">
              {t("selectUpTo5Ingredients")}
            </p>
          </div>
        </div>
        <DialogFooter className="bg-gray-100 p-2 sm:p-3 border-t flex flex-row items-center justify-between gap-2 sm:gap-3 rounded-b-lg">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="border-gray-300 text-gray-700 hover:bg-gray-200 w-7 h-7 sm:w-8 sm:h-8"
            >
              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <span className="text-base sm:text-lg font-bold w-6 sm:w-8 text-center text-gray-700">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
              className="border-gray-300 text-gray-700 hover:bg-gray-200 w-7 h-7 sm:w-8 sm:h-8"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          <Button
            size="lg"
            className="flex-grow sm:flex-grow-0 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base py-2"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 mr-1 sm:mr-2" />
            {t("addToCart")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MixPicaDetailModal;
