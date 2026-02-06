"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { CoffeeFilters } from "../model/types";
import { coffeeKeys, getCoffees } from "./coffee-api";

export function useCoffees(filters: CoffeeFilters = {}) {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => getCoffees(filters),
    queryKey: coffeeKeys.list(filters),
  });
}
