import { CoffeeList, getCoffees } from "@/entities/coffee";

import styles from "./home-page.module.scss";
import { cn } from "@/shared/lib/classnames";

const DEFAULT_FILTERS = {
  limit: 6,
};

export async function HomePage() {
  const initialData = await getCoffees(DEFAULT_FILTERS);

  return (
    <main className="page">
      <div className={styles.hero}>
        <div className={cn("container", styles.hero_content)}>
          <h2 className={styles.hero_title}>Roasted Coffee</h2>
          <p className={styles.hero_description}>
            Choose a coffe from below or create your own.
          </p>
          <button className="button">Create your own coffee</button>
        </div>
      </div>
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
