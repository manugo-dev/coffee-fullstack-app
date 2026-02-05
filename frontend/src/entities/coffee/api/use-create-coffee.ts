"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateCoffeeDto } from "../model/types";
import { coffeeKeys, createCoffee } from "./coffee-api";

export function useCreateCoffee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCoffeeDto) => createCoffee(data),
    onSuccess: () => {
      // Invalidate all coffee list queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: coffeeKeys.lists() });
    },
  });
}
