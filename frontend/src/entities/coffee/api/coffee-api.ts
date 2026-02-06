import { api } from "@/shared/api";

import type {
  Coffee,
  CoffeeFilters,
  CoffeeListResponse,
  CreateCoffeeDto,
} from "../model/types";

// Query keys factory
export const coffeeKeys = {
  all: ["coffees"] as const,
  list: (filters: CoffeeFilters) => [...coffeeKeys.lists(), filters] as const,
  lists: () => [...coffeeKeys.all, "list"] as const,
};

export async function getCoffees(
  filters: CoffeeFilters = {},
): Promise<CoffeeListResponse> {
  const { data } = await api.get<CoffeeListResponse>("/coffees", {
    params: {
      limit: filters.limit,
      page: filters.page,
      type: filters.type,
    },
  });

  return data;
}

export async function createCoffee(dto: CreateCoffeeDto): Promise<Coffee> {
  const { data } = await api.post<Coffee>("/coffees", dto);

  return data;
}
