"use client";

import { useCallback, useState } from "react";

import { Input } from "./input";
import type { InputProps } from "./input.types";
import { formatPrice, sanitizeInput } from "./input.utils";

type PriceInputProps = Omit<InputProps, "onChange" | "type" | "value"> & {
  onChange: (_value: number) => void;
  value: number;
};

export function PriceInput({
  onBlur,
  onChange,
  value,
  ...props
}: PriceInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatPrice(value));

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizeInput(event.target.value);
      setDisplayValue(sanitized);
      const parsed = Number.parseFloat(sanitized);
      onChange(Number.isNaN(parsed) ? 0 : parsed);
    },
    [onChange],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (value > 0) {
        setDisplayValue(formatPrice(value));
      }
      onBlur?.(event);
    },
    [value, onBlur],
  );

  return (
    <Input
      type="text"
      inputMode="decimal"
      placeholder="0.00"
      suffix="€"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
}
