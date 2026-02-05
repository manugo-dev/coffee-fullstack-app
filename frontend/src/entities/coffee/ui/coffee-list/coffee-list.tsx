"use client";

import { useState } from "react";

import { Pagination } from "@/shared/ui/pagination";

import { useCoffees } from "../../api/use-coffees";
import type { CoffeeFilters } from "../../model/types";
import { CoffeeCard } from "../coffee-card/coffee-card";
import styles from "./coffee-list.module.scss";
import { Spinner } from "@/shared/ui/spinner";

interface CoffeeListProps {
  initialFilters?: CoffeeFilters;
}

export function CoffeeList({ initialFilters = {} }: CoffeeListProps) {
  const [filters, setFilters] = useState<CoffeeFilters>(initialFilters);

  const {
    data: coffeesResponse,
    error,
    isError,
    isLoading,
    isFetching,
  } = useCoffees(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (isError) {
    return (
      <p data-error="true">
        {error instanceof Error ? error.message : "Failed to load coffees"}
      </p>
    );
  }

  if (!coffeesResponse || coffeesResponse.data.length === 0) {
    return <div className={styles.empty}>No coffees found</div>;
  }

  return (
    <div
      className={styles.list}
      data-fetching={isFetching || isLoading || undefined}
    >
      <div className={styles.spinner}>
        <Spinner />
      </div>
      <div className={styles.grid}>
        {coffeesResponse.data.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
      <Pagination
        currentPage={coffeesResponse.meta.page}
        totalPages={coffeesResponse.meta.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
