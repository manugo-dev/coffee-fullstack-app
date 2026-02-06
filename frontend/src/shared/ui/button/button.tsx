import { cn } from "@/shared/lib/classnames";

import type { ButtonProps } from "./button.types";

import styles from "./button.module.scss";

export function Button({
  children,
  className = "",
  fullWidth = false,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth}
      {...props}
    >
      {children}
    </button>
  );
}
