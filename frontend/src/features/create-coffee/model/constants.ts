import type { CoffeeType } from "@/entities/coffee";

export const MAX_PRICE = 99_999_999.99;

export const COFFEE_TYPE_OPTIONS: { label: string; value: CoffeeType }[] = [
  { label: "Arabic", value: "arabic" },
  { label: "Robusta", value: "robusta" },
];

export const DEFAULT_FORM_VALUES = {
  description: "",
  // eslint-disable-next-line sonarjs/todo-tag
  // TODO: Remove this once image upload is implemented
  imageUrl:
    "https://static.vecteezy.com/system/resources/thumbnails/041/643/200/small/ai-generated-a-cup-of-coffee-and-a-piece-of-coffee-bean-perfect-for-food-and-beverage-related-designs-or-promoting-cozy-moments-png.png",
  name: "",
  price: 0,
  type: "" as CoffeeType,
};
