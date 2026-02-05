import type { CoffeeFilters, CoffeeListResponse } from "../../model";

export interface CoffeeListProps {
  initialData: CoffeeListResponse;
  initialFilters?: CoffeeFilters;
}
