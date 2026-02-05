import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { CoffeeList, coffeeKeys, getCoffees } from "@/entities/coffee";
import { HomeHero } from "@/widgets/home-hero";
import { getQueryClient } from "@/shared/api";

const DEFAULT_FILTERS = {
  limit: 6,
};

export async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: coffeeKeys.list(DEFAULT_FILTERS),
    queryFn: () => getCoffees(DEFAULT_FILTERS),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="page">
        <HomeHero />
        <div className="container">
          <h2 className="section_title">MVST. Exclusive Coffee</h2>
          <CoffeeList initialFilters={DEFAULT_FILTERS} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
