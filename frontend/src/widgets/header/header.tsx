"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { useCreateCoffeeModal } from "@/features/create-coffee";
import { Button } from "@/shared/ui/button";

import styles from "./header.module.scss";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useCreateCoffeeModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={isScrolled || undefined}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <Image
            src="/images/logo.svg"
            alt="MVST. Coffee"
            width={165}
            height={25}
          />
        </a>

        <nav className={styles.nav}>
          <Button size="sm" onClick={openModal}>
            Create Coffee
          </Button>
        </nav>
      </div>
    </header>
  );
}
