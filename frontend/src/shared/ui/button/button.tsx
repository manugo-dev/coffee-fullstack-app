import type { ButtonProps } from "./button.types";
import styles from "./button.module.scss";
import { cn } from "@/shared/lib/classnames";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
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
