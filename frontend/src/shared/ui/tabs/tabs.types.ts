export interface TabOption<T extends string = string> {
  label: string;
  value: T;
}

export interface TabsProps<T extends string = string> {
  className?: string;
  onChange: (_value: T) => void;
  options: TabOption<T>[];
  value: T;
}
