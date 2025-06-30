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
import type { PizzaModalData } from "@/types/pizza";

interface PizzaDetailModalProps {
  pizzaData: PizzaModalData | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PizzaDetailModal: React.FC<PizzaDetailModalProps> = ({
  pizzaData,
  isOpen,
  onOpenChange,
}) => {
  const { t } = useLanguage();
  const [currentSize, setCurrentSize] = useState<{
    name: string;
    price: number;
  }>({ name: "", price: 0 });
  const [currentSauce, setCurrentSauce] = useState<{
    name: string;
    price: number;
  }>({ name: "", price: 0 });
  const [currentExtras, setCurrentExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize state when pizzaData changes
  useEffect(() => {
    if (!pizzaData) return;
    setCurrentSize(
      pizzaData.sizes.find((s) => s.name === pizzaData.defaultSizeName) ||
        pizzaData.sizes[0]
    );
    setCurrentSauce(
      pizzaData.sauces.find((s) => s.name === pizzaData.defaultSauceName) ||
        pizzaData.sauces[0]
    );
    setCurrentExtras([]);
    setQuantity(1);
  }, [pizzaData]);

  // Calculate total price
  useEffect(() => {
    if (!pizzaData) return;

    let price = currentSize.price;

    // Add sauce price if not default
    if (currentSauce.name !== pizzaData.defaultSauceName) {
      price += currentSauce.price;
    }

    // Calculate extras price
    let leftExtrasSelectedCount = 0;
    let rightExtrasSelectedCount = 0;

    currentExtras.forEach((extraId) => {
      const extra = pizzaData.extras.find((e) => e.id === extraId);
      if (extra) {
        if (extra.column === "left") {
          if (leftExtrasSelectedCount < pizzaData.maxFreeLeftExtras) {
            leftExtrasSelectedCount++;
          } else {
            price += extra.price;
          }
        } else if (extra.column === "right") {
          if (rightExtrasSelectedCount < pizzaData.maxFreeRightExtras) {
            rightExtrasSelectedCount++;
          } else {
            price += extra.price;
          }
        }
      }
    });

    setTotalPrice(price * quantity);
  }, [pizzaData, currentSize, currentSauce, currentExtras, quantity]);

  const formatPrice = (price: number) =>
    price.toFixed(2).replace(".", ",") + " €";

  const handleExtraToggle = (extraId: string) => {
    setCurrentExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((e) => e !== extraId)
        : [...prev, extraId]
    );
  };

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    }
  };

  if (!pizzaData) return null;

  const extrasLeft = pizzaData.extras.filter((e) => e.column === "left");
  const extrasRight = pizzaData.extras.filter((e) => e.column === "right");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-md lg:max-w-lg w-full p-0 m-0 max-h-[95vh] flex flex-col bg-transparent border-none shadow-none outline-none ring-0 focus:ring-0">
        <DialogHeader className="bg-black text-white p-2 flex flex-row items-center justify-between rounded-t-lg">
          <Image
            src="/Logo-ProfPizza.png"
            alt="Prof Pizza"
            width={28}
            height={28}
          />
        </DialogHeader>

        <div className="bg-[#a16a6a] p-3 flex-grow overflow-y-auto space-y-2 text-white">
          <div className="relative flex items-start gap-3">
            <Image
              src={pizzaData.img || "/placeholder.svg"}
              alt={pizzaData.name}
              width={100}
              height={100}
              className="rounded-md object-contain flex-shrink-0 mt-1 w-24 h-24 sm:w-28 sm:h-28"
            />
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {pizzaData.itemNumberForModal}
                </div>
                <h3 className="text-sm font-semibold">{pizzaData.name}</h3>
              </div>
              <p className="text-xs leading-tight opacity-90 mb-1">
                {pizzaData.desc}
              </p>
              {pizzaData.baseIngredientsModal.map((ing, i) => (
                <p key={i} className="text-xs leading-tight opacity-90">
                  {ing}
                </p>
              ))}
              <p className="text-xs leading-tight opacity-90 mt-0.5">
                {pizzaData.baseSauceModal}
              </p>
            </div>
            <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-16 h-16 sm:w-[70px] sm:h-[70px] flex flex-col items-center justify-center text-sm font-bold p-1 text-center leading-tight shadow-md">
              <ShoppingCart className="w-3 h-3 mb-0.5" />
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-center items-center flex-wrap mt-8 mb-5 gap-1.5">
              {pizzaData.sizes.map((size) => (
                <Button
                  key={size.name}
                  variant={
                    currentSize.name === size.name ? "secondary" : "outline"
                  }
                  onClick={() => setCurrentSize(size)}
                  className={`h-auto py-1 px-2.5 text-[10px] rounded-full ${
                    currentSize.name === size.name
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {size.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Sauce Selection */}
          <div>
            <div className="flex justify-center items-baseline">
              <h4 className="font-semibold text-xs opacity-90 mb-1 mt-2 text-center">
                {t("sauce")}
              </h4>
              <span className="text-[9px] opacity-70 ml-1">
                (
                {formatPrice(
                  pizzaData.sauces.find(
                    (s) => s.name !== pizzaData.defaultSauceName
                  )?.price || 0
                )}
                )
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {pizzaData.sauces.map((sauce) => (
                <Button
                  key={sauce.name}
                  variant={
                    currentSauce.name === sauce.name ? "secondary" : "outline"
                  }
                  onClick={() => setCurrentSauce(sauce)}
                  className={`h-auto py-1 px-2.5 text-[10px] rounded-full ${
                    currentSauce.name === sauce.name
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {sauce.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Extras Selection */}
          <div>
            <div className="flex justify-between items-baseline mb-1 mt-2">
              <h4 className="font-semibold text-xs opacity-90">
                {t("extras")}{" "}
                <span className="text-[9px] opacity-70">
                  ({formatPrice(extrasLeft[0]?.price || 0)})
                </span>
              </h4>
              <h4 className="font-semibold text-xs opacity-90">
                <span className="text-[9px] opacity-70">
                  ({formatPrice(extrasRight[0]?.price || 0)})
                </span>
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-x-1.5 gap-y-1">
              {[extrasLeft, extrasRight].map((columnExtras, colIdx) => (
                <div key={colIdx} className="space-y-1">
                  {columnExtras.map((extra) => (
                    <Button
                      key={extra.id}
                      variant={
                        currentExtras.includes(extra.id)
                          ? "secondary"
                          : "outline"
                      }
                      onClick={() => handleExtraToggle(extra.id)}
                      className={`w-full h-auto py-1 px-2 text-[10px] rounded-full justify-start truncate ${
                        currentExtras.includes(extra.id)
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {extra.text}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-white/60 mt-1 text-center">
              {t("leftUpToFree")} {pizzaData.maxFreeLeftExtras} {t("free")}.{" "}
              {t("rightUpToFree")} {pizzaData.maxFreeRightExtras} {t("free")}.
            </p>
          </div>
        </div>

        <DialogFooter className="bg-black/80 p-2 border-t border-white/20 flex flex-row items-center justify-between gap-2 rounded-b-lg">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantity("dec")}
              className="border-white/30 text-white bg-transparent hover:bg-white/70 w-7 h-7"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-base font-bold w-6 text-center text-white">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantity("inc")}
              className="border-white/30 text-white bg-transparent hover:bg-white/70 w-7 h-7"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <Button
            size="sm"
            className="flex-grow bg-red-600 hover:bg-red-700 text-white text-xs py-2 h-auto"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {t("addToCart")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PizzaDetailModal;
