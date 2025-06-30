export interface PizzaModalSize {
  name: string;
  price: number;
  diameter?: string;
}

export interface PizzaModalSauce {
  name: string;
  price: number;
}

export interface PizzaModalExtra {
  id: string;
  name: string;
  text: string;
  price: number;
  column: "left" | "right";
}

export interface PizzaModalData {
  id: string;
  itemNumberForModal: number;
  name: string;
  img: string;
  modalImage: string;
  desc: string;
  baseIngredientsModal: string[];
  baseSauceModal: string;
  price: number[];
  sizes: PizzaModalSize[];
  defaultSizeName: string;
  sauces: PizzaModalSauce[];
  defaultSauceName: string;
  extras: PizzaModalExtra[];
  maxFreeLeftExtras: number;
  maxFreeRightExtras: number;
}

export interface PizzaDisplayItem {
  image: string;
  numberImage: string;
  text: string[];
  modalDataId: string;
}
