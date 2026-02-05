import { Coffee, CoffeeCard, getCoffees } from "@/entities/coffee";

import styles from "./page.module.scss";
import { cn } from "@/shared/lib/classnames";

export default async function Home() {
  let coffees: Coffee[] = [];
  let error: string | null = null;

  try {
    const response = await getCoffees();
    coffees = response.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Unexpected error";
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className={styles.title}>Coffee Collection</h1>

        <section className="container">
          <h2 className="section-title">MVST. EXCLUSIVE Coffee</h2>
          {error ? (
            <p>Cannot get coffees</p>
          ) : coffees.length === 0 ? (
            <p>No coffees found</p>
          ) : (
            <div className={styles.grid}>
              {coffees.map((coffee) => (
                <CoffeeCard key={coffee.id} coffee={coffee} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
