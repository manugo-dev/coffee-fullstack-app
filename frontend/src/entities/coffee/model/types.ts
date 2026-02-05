export type CoffeeType = "arabic" | "robusta";

export interface Coffee {
  id: string;
  name: string;
  description: string;
  type: CoffeeType;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeListResponse {
  data: Coffee[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CoffeeFilters {
  type?: CoffeeType;
  page?: number;
  limit?: number;
}

export interface CreateCoffeeDto {
  name: string;
  description: string;
  type: CoffeeType;
  price: number;
  imageUrl: string;
}
