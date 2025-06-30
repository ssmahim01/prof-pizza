"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "lt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation dictionaries
const translations = {
  en: {
    menu: "menu",
    backToHomepage: "Back To Homepage",
    contactAboutDemo: "Contact About Demo",
    lt: "LT",
    en: "EN",
    picos: "Pizzas",
    pitaGyros: "Pita-Gyros",
    kebabai: "Kebabs",
    uzkandziai: "Snacks",
    gerimai: "Drinks",
    kava: "Coffee",
    ledai: "Ice Cream",
    welcome: "Welcome to Prof Pizza",
    orderNow: "Order Now",
    aboutUs: "About Us",
    contact: "Contact",
    cart: "Cart",
    total: "Total",
    // Footer translations
    workingHours: "Working Hours",
    workingTime: "11 AM - 11 PM",
    address: "Ukmergės st. 294, Vilnius",
    email: "Email info@profpizza.lt",
    // ItemSection translations
    mixPizza: "MIX pizza",
    createTastiest: "Create the tastiest",
    // PizzaSection translations
    withCookedHam: "with Cooked Ham",
    // Pizza ingredients
    cookedHam: "Cooked Ham",
    paprika: "Paprika",
    olives: "Olives",
    smokedCheese: "Smoked Cheese",
    mozzarellaCheese: "Mozzarella Cheese",
    blueOnions: "Blue Onions",
    cherryTomatoes: "Cherry Tomatoes",
    freshBasil: "Fresh Basil",
    mushrooms: "Mushrooms",
    broccoli: "Broccoli",
    bacon: "Bacon",
    // Modal translations
    tomatoSauce: "Tomato Sauce",
    pestoSauce: "Pesto Sauce",
    creamSauce: "Cream Sauce",
    garlicSauce: "Garlic",
    spicySauce: "Spicy",
    hotSauce: "Hot",
    bbqSauce: "BBQ",
    ketchupSauce: "Ketchup",
    sauce: "Sauce",
    extras: "Extras",
    addToCart: "Add to Cart",
    ingredients: "ingredients",
    selectUpTo5Ingredients: "Select up to 5 ingredients (2 free)",
    leftUpToFree: "Left: up to",
    rightUpToFree: "Right: up to",
    free: "free",
    // Ingredients
    groundMeat: "Ground Meat",
    beefChips: "Beef Chips",
    chicken: "Chicken",
    shrimp: "Shrimp",
    leeks: "Leeks",
    eggplant: "Eggplant",
    pineapple: "Pineapple",
    cucumbers: "Cucumbers",
    scallions: "Scallions",
    driedTomatoes: "Dried Tomatoes",
    jalapenos: "Jalapenos",
    basil: "Basil",
    spinach: "Spinach",
    arugula: "Arugula",
    fetaCheese: "Feta Cheese",
    sundriedTomatoes: "Sun-dried Tomatoes",
    additionalMushrooms: "Additional Mushrooms",
    smokedChicken: "Smoked Chicken",
    pickledCucumbers: "Pickled Cucumbers",
    dill: "Dill",
    salamis: "Salami",
  },
  lt: {
    menu: "meniu",
    backToHomepage: "Atgal į pradžią",
    contactAboutDemo: "Susisiekite dėl demo",
    lt: "LT",
    en: "EN",
    picos: "Picos",
    pitaGyros: "Pita-Gyros",
    kebabai: "Kebabai",
    uzkandziai: "Užkandžiai",
    gerimai: "Gėrimai",
    kava: "Kava",
    ledai: "Ledai",
    welcome: "Sveiki atvykę į Prof Pizza",
    orderNow: "Užsisakyti dabar",
    aboutUs: "Apie mus",
    contact: "Kontaktai",
    cart: "Krepšelis",
    total: "Viso",
    // Footer translations
    workingHours: "Darbo laikas",
    workingTime: "11-23 val.",
    address: "Ukmergės g. 294, Vilnius",
    email: "El. paštas info@profpizza.lt",
    // ItemSection translations
    mixPizza: "MIX pica",
    createTastiest: "Susikurk skaniausią",
    // PizzaSection translations
    withCookedHam: "su Virtu kumpiu",
    // Pizza ingredients
    cookedHam: "Virtas kumpis",
    paprika: "Paprika",
    olives: "Alyvuogės",
    smokedCheese: "Rūkytas sūris",
    mozzarellaCheese: "Mozzarella sūris",
    blueOnions: "Mėlyniji svogūnai",
    cherryTomatoes: "Vytiniai pomidorai",
    freshBasil: "Šviežias bazilikas",
    mushrooms: "Pievagrybiai",
    broccoli: "Brokoliai",
    bacon: "Šoninė",
    // Modal translations
    tomatoSauce: "Pomidorų padažas",
    pestoSauce: "Pesto padažas",
    creamSauce: "Grietinėlės padažas",
    garlicSauce: "Česnakinis",
    spicySauce: "Pikantiškas",
    hotSauce: "Aštrus",
    bbqSauce: "BBQ",
    ketchupSauce: "Ketčupas",
    sauce: "Padažas",
    extras: "Priedai",
    addToCart: "Į krepšelį",
    ingredients: "ingredientai",
    selectUpTo5Ingredients: "Pasirinkite iki 5 ingredientų (2 nemokami)",
    leftUpToFree: "Kairė: iki",
    rightUpToFree: "Dešinė: iki",
    free: "nemokamai",
    // Ingredients
    groundMeat: "Malta mėsa",
    beefChips: "Jautienos kumpeliai",
    chicken: "Vištiena",
    shrimp: "Krevetės",
    leeks: "Porai",
    eggplant: "Baklažanai",
    pineapple: "Ananasai",
    cucumbers: "Agurkai",
    scallions: "Svogūnėliai",
    driedTomatoes: "Džiovinti pomidorai",
    jalapenos: "Jalapenai",
    basil: "Bazilikas",
    spinach: "Špinatai",
    arugula: "Rukola",
    fetaCheese: "Feta sūris",
    sundriedTomatoes: "Saulėje dž. pomidorai",
    additionalMushrooms: "Papildomi pievagrybiai",
    smokedChicken: "Rūkyta vištiena",
    pickledCucumbers: "Marinuoti agurkai",
    dill: "Krapai",
    salamis: "Salamis",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("lt");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "preferred-language"
    ) as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "lt")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
