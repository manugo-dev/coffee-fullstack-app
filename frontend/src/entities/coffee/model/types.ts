export type CoffeeType = "arabic" | "robusta";

export interface Coffee {
  createdAt: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: CoffeeType;
  updatedAt: string;
}

export interface CoffeeListResponse {
  data: Coffee[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

export interface CoffeeFilters {
  limit?: number;
  page?: number;
  type?: CoffeeType;
}

export interface CreateCoffeeDto {
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  type: CoffeeType;
}
