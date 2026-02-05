import * as yup from "yup";

import { MAX_PRICE } from "./constants";

export const createCoffeeSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .max(MAX_PRICE, `Price cannot exceed ${MAX_PRICE.toLocaleString()}`)
    .required("Price is required"),
  type: yup
    .string()
    .oneOf(["arabic", "robusta"] as const, "Type is required")
    .required("Type is required"),
  imageUrl: yup
    .string()
    .trim()
    .url("Invalid URL format")
    .required("Image URL is required"),
  description: yup.string().trim().required("Description is required"),
});

export type CreateCoffeeFormData = yup.InferType<typeof createCoffeeSchema>;
