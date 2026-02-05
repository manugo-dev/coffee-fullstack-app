import type { CoffeeType } from "@/entities/coffee";

export const MAX_PRICE = 99999999.99;

export const COFFEE_TYPE_OPTIONS: { value: CoffeeType; label: string }[] = [
  { value: "arabic", label: "Arabic" },
  { value: "robusta", label: "Robusta" },
];

export const DEFAULT_FORM_VALUES = {
  name: "",
  price: 0,
  type: "" as CoffeeType,
  // TODO: Remove this once image upload is implemented
  imageUrl:
    "https://static.vecteezy.com/system/resources/thumbnails/041/643/200/small/ai-generated-a-cup-of-coffee-and-a-piece-of-coffee-bean-perfect-for-food-and-beverage-related-designs-or-promoting-cozy-moments-png.png",
  description: "",
};
