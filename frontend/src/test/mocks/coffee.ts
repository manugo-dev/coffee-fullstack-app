import type { Coffee, CoffeeListResponse } from "@/entities/coffee";

export const mockCoffees: Coffee[] = [
  {
    createdAt: "2024-01-01T00:00:00Z",
    description: "A bold and rich espresso",
    id: "1",
    imageUrl: "https://example.com/espresso.jpg",
    name: "Espresso Roast",
    price: 12.99,
    type: "arabic",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    createdAt: "2024-01-02T00:00:00Z",
    description: "Perfect for your morning routine",
    id: "2",
    imageUrl: "https://example.com/morning.jpg",
    name: "Morning Blend",
    price: 9.99,
    type: "robusta",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    createdAt: "2024-01-03T00:00:00Z",
    description: "Intense and smoky flavor",
    id: "3",
    imageUrl: "https://example.com/dark.jpg",
    name: "Dark Roast",
    price: 14.99,
    type: "arabic",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    createdAt: "2024-01-04T00:00:00Z",
    description: "Strong and energizing",
    id: "4",
    imageUrl: "https://example.com/robusta.jpg",
    name: "Robusta Special",
    price: 11.99,
    type: "robusta",
    updatedAt: "2024-01-04T00:00:00Z",
  },
];

export const mockCoffeeResponse: CoffeeListResponse = {
  data: mockCoffees,
  meta: {
    limit: 6,
    page: 1,
    total: 4,
    totalPages: 1,
  },
};

export const mockCoffeeResponsePage2: CoffeeListResponse = {
  data: mockCoffees.slice(2),
  meta: {
    limit: 2,
    page: 2,
    total: 4,
    totalPages: 2,
  },
};

export const mockArabicCoffees: CoffeeListResponse = {
  data: mockCoffees.filter((c) => c.type === "arabic"),
  meta: {
    limit: 6,
    page: 1,
    total: 2,
    totalPages: 1,
  },
};

export const mockRobustaCoffees: CoffeeListResponse = {
  data: mockCoffees.filter((c) => c.type === "robusta"),
  meta: {
    limit: 6,
    page: 1,
    total: 2,
    totalPages: 1,
  },
};

export const mockEmptyResponse: CoffeeListResponse = {
  data: [],
  meta: {
    limit: 6,
    page: 1,
    total: 0,
    totalPages: 0,
  },
};
