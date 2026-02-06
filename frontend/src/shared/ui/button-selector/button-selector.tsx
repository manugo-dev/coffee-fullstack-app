"use client";

import { cn } from "@/shared/lib/classnames";

import type { ButtonSelectorProps } from "./button-selector.types";

import styles from "./button-selector.module.scss";

export function ButtonSelector<T extends string>({
  className,
  error,
  label,
  onChange,
  options,
  value,
}: ButtonSelectorProps<T>) {
  return (
    <div className={cn(styles.field, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.group} role="group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.button}
            data-selected={value === option.value}
            data-error={!!error}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
