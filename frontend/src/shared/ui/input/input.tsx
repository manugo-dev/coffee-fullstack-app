import { forwardRef, useId } from "react";

import { cn } from "@/shared/lib/classnames";

import type { InputProps } from "./input.types";

import styles from "./input.module.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, id: propertyId, label, suffix, ...props },
    reference,
  ) => {
    const generatedId = useId();
    const id = propertyId ?? generatedId;

    return (
      <div className={cn(styles.field, className)}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.wrapper}>
          <input
            ref={reference}
            id={id}
            className={styles.input}
            data-error={!!error}
            data-has-suffix={!!suffix}
            {...props}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
