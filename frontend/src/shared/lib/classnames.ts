// eslint-disable-next-line import-x/no-named-as-default
import clsx, { ClassValue } from "clsx";

export const cn = (...classes: ClassValue[]) => {
  return clsx(classes);
};
