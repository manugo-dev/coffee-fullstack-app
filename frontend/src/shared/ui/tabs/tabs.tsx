"use client";

import { motion } from "motion/react";

import type { TabsProps } from "./tabs.types";
import styles from "./tabs.module.scss";

export function Tabs<T extends string = string>({
  options,
  value,
  onChange,
  className = "",
}: TabsProps<T>) {
  return (
    <div className={`${styles.tabs} ${className}`}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            className={styles.tab}
            data-active={isActive || undefined}
            onClick={() => onChange(option.value)}
          >
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className={styles.indicator}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
