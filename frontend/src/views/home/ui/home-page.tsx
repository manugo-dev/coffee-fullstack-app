import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { coffeeKeys, CoffeeList, getCoffees } from "@/entities/coffee";
import { getQueryClient } from "@/shared/api";
import { HomeHero } from "@/widgets/home-hero";

const DEFAULT_FILTERS = {
  limit: 6,
};

export async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getCoffees(DEFAULT_FILTERS),
    queryKey: coffeeKeys.list(DEFAULT_FILTERS),
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
