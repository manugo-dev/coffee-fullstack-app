import clsx from "clsx";

export const cn = (...classes: clsx.ClassValue[]) => {
  return clsx(classes);
};
