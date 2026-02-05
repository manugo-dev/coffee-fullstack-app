import type { Coffee, CoffeeListResponse } from "@/entities/coffee";

export const mockCoffees: Coffee[] = [
  {
    id: "1",
    name: "Espresso Roast",
    description: "A bold and rich espresso",
    type: "arabic",
    price: 12.99,
    imageUrl: "https://example.com/espresso.jpg",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Morning Blend",
    description: "Perfect for your morning routine",
    type: "robusta",
    price: 9.99,
    imageUrl: "https://example.com/morning.jpg",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Dark Roast",
    description: "Intense and smoky flavor",
    type: "arabic",
    price: 14.99,
    imageUrl: "https://example.com/dark.jpg",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Robusta Special",
    description: "Strong and energizing",
    type: "robusta",
    price: 11.99,
    imageUrl: "https://example.com/robusta.jpg",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
];

export const mockCoffeeResponse: CoffeeListResponse = {
  data: mockCoffees,
  meta: {
    total: 4,
    page: 1,
    limit: 6,
    totalPages: 1,
  },
};

export const mockCoffeeResponsePage2: CoffeeListResponse = {
  data: mockCoffees.slice(2),
  meta: {
    total: 4,
    page: 2,
    limit: 2,
    totalPages: 2,
  },
};

export const mockArabicCoffees: CoffeeListResponse = {
  data: mockCoffees.filter((c) => c.type === "arabic"),
  meta: {
    total: 2,
    page: 1,
    limit: 6,
    totalPages: 1,
  },
};

export const mockRobustaCoffees: CoffeeListResponse = {
  data: mockCoffees.filter((c) => c.type === "robusta"),
  meta: {
    total: 2,
    page: 1,
    limit: 6,
    totalPages: 1,
  },
};

export const mockEmptyResponse: CoffeeListResponse = {
  data: [],
  meta: {
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0,
  },
};
