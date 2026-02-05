export const formatPrice = (value: number): string => {
  if (!value || value === 0) return "";
  return value.toFixed(2);
};

export const sanitizeInput = (value: string): string => {
  // Remove non-numeric characters except decimal point
  let sanitized = value.replace(/[^\d.]/g, "");
  // Ensure only one decimal point
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    sanitized = parts[0] + "." + parts.slice(1).join("");
  }
  // Limit to 2 decimal places
  if (parts.length === 2 && parts[1].length > 2) {
    sanitized = parts[0] + "." + parts[1].slice(0, 2);
  }
  return sanitized;
};
