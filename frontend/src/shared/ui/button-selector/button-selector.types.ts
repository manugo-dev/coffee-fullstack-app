export interface ButtonSelectorOption<T extends string> {
  label: string;
  value: T;
}

export interface ButtonSelectorProps<T extends string> {
  className?: string;
  error?: string;
  label?: string;
  onChange: (_value: T) => void;
  options: ButtonSelectorOption<T>[];
  value?: T | null;
}
