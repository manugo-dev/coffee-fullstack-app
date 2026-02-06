"use client";

import { useCreateCoffeeModal } from "@/features/create-coffee";
import { cn } from "@/shared/lib/classnames";
import { Button } from "@/shared/ui/button";

import styles from "./home-hero.module.scss";

export function HomeHero() {
  const { openModal } = useCreateCoffeeModal();

  return (
    <section className={styles.hero}>
      <div className={cn("container", styles.hero_content)}>
        <h2 className={styles.hero_title}>Roasted Coffee</h2>
        <p className={styles.hero_description}>
          Choose a coffee from below or create your own.
        </p>
        <Button onClick={openModal}>Create your own coffee</Button>
      </div>
    </section>
  );
}
