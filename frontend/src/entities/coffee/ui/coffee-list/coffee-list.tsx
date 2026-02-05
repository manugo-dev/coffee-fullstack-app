"use client";

import { useState } from "react";

import { Pagination } from "@/shared/ui/pagination";

import { getCoffees } from "../../api";
import type { CoffeeFilters, CoffeeListResponse } from "../../model";
import { CoffeeCard } from "../coffee-card/coffee-card";
import type { CoffeeListProps } from "./coffee-list.types";
import styles from "./coffee-list.module.scss";

export function CoffeeList({
  initialData,
  initialFilters = {},
}: CoffeeListProps) {
  const [data, setData] = useState<CoffeeListResponse>(initialData);
  const [filters, setFilters] = useState<CoffeeFilters>(initialFilters);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (newFilters: CoffeeFilters) => {
    setError(null);
    try {
      const response = await getCoffees(newFilters);
      setData(response);
      setFilters(newFilters);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load coffees");
    }
  };

  const handlePageChange = (page: number) => {
    fetchData({ ...filters, page });
  };

  const coffees = data.data;
  const { page, totalPages } = data.meta;

  if (error) {
    return <p data-error="true">{error}</p>;
  }

  if (coffees.length === 0) {
    return <p>No coffees found</p>;
  }

  return (
    <div className={styles.list}>
      <div className={styles.grid}>
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
