"use client";

import { useState } from "react";

import { Pagination } from "@/shared/ui/pagination";
import { Tabs, type TabOption } from "@/shared/ui/tabs";
import { Spinner } from "@/shared/ui/spinner";

import { useCoffees } from "../../api/use-coffees";
import type { CoffeeFilters, CoffeeType } from "../../model/types";
import { CoffeeCard } from "../coffee-card/coffee-card";
import styles from "./coffee-list.module.scss";

type FilterType = "all" | CoffeeType;

const FILTER_OPTIONS: TabOption<FilterType>[] = [
  { value: "all", label: "All" },
  { value: "robusta", label: "Robusta" },
  { value: "arabic", label: "Arabic" },
];

interface CoffeeListProps {
  initialFilters?: CoffeeFilters;
}

export function CoffeeList({ initialFilters = {} }: CoffeeListProps) {
  const [filters, setFilters] = useState<CoffeeFilters>(initialFilters);
  const [activeTab, setActiveTab] = useState<FilterType>(
    initialFilters.type || "all"
  );

  const {
    data: coffeesResponse,
    error,
    isError,
    isLoading,
    isFetching,
  } = useCoffees(filters);

  const handleTabChange = (value: FilterType) => {
    setActiveTab(value);
    setFilters((prev) => ({
      ...prev,
      type: value === "all" ? undefined : value,
      page: 1,
    }));
  };

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <Tabs
          options={FILTER_OPTIONS}
          value={activeTab}
          onChange={handleTabChange}
        />
      </div>

      <div
        className={styles.list}
        data-fetching={isFetching || isLoading || undefined}
      >
        <div className={styles.spinner}>
          <Spinner />
        </div>

        {!coffeesResponse || coffeesResponse.data.length === 0 ? (
          <div className={styles.empty}>No coffees found</div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
