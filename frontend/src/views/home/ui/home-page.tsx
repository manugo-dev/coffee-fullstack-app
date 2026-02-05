import { CoffeeList, getCoffees } from "@/entities/coffee";
import { HomeHero } from "@/widgets/home-hero";

const DEFAULT_FILTERS = {
  limit: 6,
};

export async function HomePage() {
  const initialData = await getCoffees(DEFAULT_FILTERS);

  return (
    <main className="page">
      <HomeHero />
      <div className="container">
        <h2 className="section_title">MVST. Exclusive Coffee</h2>
        <CoffeeList
          initialData={initialData}
          initialFilters={DEFAULT_FILTERS}
        />
      </div>
    </main>
  );
}
