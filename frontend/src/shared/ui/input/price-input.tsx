"use client";

import { useState, useCallback } from "react";

import { Input } from "./input";
import type { InputProps } from "./input.types";
import { formatPrice, sanitizeInput } from "./input.utils";

type PriceInputProps = Omit<InputProps, "type" | "value" | "onChange"> & {
  value: number;
  onChange: (value: number) => void;
};

export function PriceInput({
  value,
  onChange,
  onBlur,
  ...props
}: PriceInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatPrice(value));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizeInput(e.target.value);
      setDisplayValue(sanitized);
      const parsed = parseFloat(sanitized);
      onChange(isNaN(parsed) ? 0 : parsed);
    },
    [onChange]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (value > 0) {
        setDisplayValue(formatPrice(value));
      }
      onBlur?.(e);
    },
    [value, onBlur]
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
