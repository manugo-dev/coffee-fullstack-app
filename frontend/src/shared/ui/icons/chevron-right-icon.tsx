import type { IconProps } from "./icon.types";

export function ChevronRightIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
