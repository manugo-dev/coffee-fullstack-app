"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import type { CoffeeFilters } from "../model/types";
import { coffeeKeys, getCoffees } from "./coffee-api";

export function useCoffees(filters: CoffeeFilters = {}) {
  return useQuery({
    queryKey: coffeeKeys.list(filters),
    queryFn: () => getCoffees(filters),
    placeholderData: keepPreviousData,
  });
}
