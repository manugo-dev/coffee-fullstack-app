export interface ButtonSelectorOption<T extends string> {
  value: T;
  label: string;
}

export interface ButtonSelectorProps<T extends string> {
  options: ButtonSelectorOption<T>[];
  value?: T | null;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
  error?: string;
}
