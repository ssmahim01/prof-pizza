import "server-only";

const dictionaries = {
  lt: () => import("@/dictionaries/lt.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) =>
  dictionaries[locale]?.() ?? dictionaries.lt();
