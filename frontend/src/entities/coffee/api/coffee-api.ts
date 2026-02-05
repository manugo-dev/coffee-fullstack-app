import { apiClient } from "@/shared/api";

import type {
  Coffee,
  CoffeeFilters,
  CoffeeListResponse,
  CreateCoffeeDto,
} from "../model/types";

export const COFFEES_KEY = "coffees";

export async function getCoffees(
  filters: CoffeeFilters = {}
): Promise<CoffeeListResponse> {
  const params = new URLSearchParams();

  if (filters.type) params.append("type", filters.type);
  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));

  const query = params.toString();
  const endpoint = `/coffees${query ? `?${query}` : ""}`;
  const filtersKey = JSON.stringify(filters);

  return apiClient<CoffeeListResponse>(endpoint, {
    cache: {
      revalidate: 0,
      keys: [COFFEES_KEY, query, filtersKey],
    },
  });
}

export async function createCoffee(data: CreateCoffeeDto): Promise<Coffee> {
  return apiClient<Coffee>("/coffees", {
    method: "POST",
    body: data,
  });
}
