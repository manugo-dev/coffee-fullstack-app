import { CoffeeList, getCoffees } from "@/entities/coffee";

const DEFAULT_FILTERS = {
  limit: 6,
};

export async function HomePage() {
  const initialData = await getCoffees(DEFAULT_FILTERS);

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">MVST. Exclusive Coffee</h1>
        <CoffeeList
          initialData={initialData}
          initialFilters={DEFAULT_FILTERS}
        />
      </div>
    </main>
  );
}
