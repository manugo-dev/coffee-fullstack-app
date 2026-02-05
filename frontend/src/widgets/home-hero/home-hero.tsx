"use client";

import { useState } from "react";

import { CreateCoffeeForm } from "@/features/create-coffee";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/classnames";

import styles from "./home-hero.module.scss";

export function HomeHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={cn("container", styles.hero_content)}>
        <h2 className={styles.hero_title}>Roasted Coffee</h2>
        <p className={styles.hero_description}>
          Choose a coffee from below or create your own.
        </p>
        <Button onClick={() => setIsModalOpen(true)}>
          Create your own coffee
        </Button>
      </div>
      <CreateCoffeeForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
