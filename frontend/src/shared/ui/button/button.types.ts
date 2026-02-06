import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  size?: "lg" | "md" | "sm";
  variant?: "ghost" | "outline" | "primary" | "secondary";
}
