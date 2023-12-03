import { cx } from "class-variance-authority";
import type { ClassValue } from "class-variance-authority/types";
import { twMerge } from "tailwind-merge";

export default (...classes: ClassValue[]) => {
  return twMerge(cx(...classes));
};
