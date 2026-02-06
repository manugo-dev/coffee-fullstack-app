import { delay, http, HttpResponse } from "msw";

import {
  mockArabicCoffees,
  mockCoffeeResponse,
  mockCoffeeResponsePage2,
  mockEmptyResponse,
  mockRobustaCoffees,
} from "./coffee";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const handlers = [
  // GET /coffees - List coffees with filtering and pagination
  http.get(`${API_URL}/coffees`, async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    await delay(10); // Small delay for realistic behavior

    // Handle type filtering
    if (type === "arabic") {
      return HttpResponse.json(mockArabicCoffees);
    }

    if (type === "robusta") {
      return HttpResponse.json(mockRobustaCoffees);
    }

    // Handle pagination
    if (page === "2" && limit === "2") {
      return HttpResponse.json(mockCoffeeResponsePage2);
    }

    // Handle small limit for pagination tests
    if (limit === "2") {
      return HttpResponse.json({
        ...mockCoffeeResponse,
        data: mockCoffeeResponse.data.slice(0, 2),
        meta: { ...mockCoffeeResponse.meta, limit: 2, totalPages: 2 },
      });
    }

    return HttpResponse.json(mockCoffeeResponse);
  }),

  // POST /coffees - Create a new coffee
  http.post(`${API_URL}/coffees`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    await delay(10);

    return HttpResponse.json(
      {
        id: "new-coffee-id",
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
];

// Handlers for error scenarios
export const errorHandlers = {
  createError: http.post(`${API_URL}/coffees`, () => {
    return HttpResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }),

  duplicateCoffee: http.post(`${API_URL}/coffees`, () => {
    return HttpResponse.json(
      { message: "A coffee with the same name already exists" },
      { status: 409 },
    );
  }),

  empty: http.get(`${API_URL}/coffees`, () => {
    return HttpResponse.json(mockEmptyResponse);
  }),

  networkError: http.get(`${API_URL}/coffees`, () => {
    return HttpResponse.json({ message: "Network error" }, { status: 500 });
  }),

  serverError: http.get(`${API_URL}/coffees`, () => {
    return HttpResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }),

  timeout: http.get(`${API_URL}/coffees`, () => {
    return HttpResponse.json({ message: "Request timeout" }, { status: 408 });
  }),

  unauthorized: http.get(`${API_URL}/coffees`, () => {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }),
};
