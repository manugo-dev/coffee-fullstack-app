export interface TabOption<T extends string = string> {
  value: T;
  label: string;
}

export interface TabsProps<T extends string = string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}
