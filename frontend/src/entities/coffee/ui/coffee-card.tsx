import type { Coffee } from "../model";

import styles from "./coffee-card.module.scss";

interface CoffeeCardProps {
  coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const formattedPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(coffee.price);

  return (
    <article className={styles.card}>
      <span className={styles.type} data-type={coffee.type}>
        {coffee.type}
      </span>
      <div className={styles.imageWrapper}>
        <img src={coffee.imageUrl} alt={coffee.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{coffee.name}</h3>
        <p className={styles.description}>{coffee.description}</p>
        <span className={styles.price}>{formattedPrice}</span>
      </div>
    </article>
  );
}
