"use client";

import type { ButtonSelectorProps } from "./button-selector.types";
import styles from "./button-selector.module.scss";

export function ButtonSelector<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: ButtonSelectorProps<T>) {
  return (
    <div className={`${styles.field}${className ? ` ${className}` : ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.group} role="group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.button}
            data-selected={value === option.value}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
