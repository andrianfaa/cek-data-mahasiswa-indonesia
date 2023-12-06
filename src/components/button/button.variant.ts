import { cva } from "class-variance-authority";

export const Button = cva([], {
  variants: {
    style: {
      primary: ["bg-black-1", "text-white"]
    },
    size: {
      normal: ["px-4 py-3"],
      small: ["px-3 py-2"],
      large: ["px-5 py-4"]
    }
  },
  defaultVariants: {
    style: "primary",
    size: "normal"
  }
});
