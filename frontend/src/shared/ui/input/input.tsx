import { forwardRef, useId } from "react";

import type { InputProps } from "./input.types";
import styles from "./input.module.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, suffix, className, id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId ?? generatedId;

    return (
      <div className={`${styles.field}${className ? ` ${className}` : ""}`}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.wrapper}>
          <input
            ref={ref}
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
  }
);

Input.displayName = "Input";
