import clsx, { ClassValue } from "clsx";

export const cn = (...classes: ClassValue[]) => {
  return clsx(classes);
};
