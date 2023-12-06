import { cva } from "class-variance-authority";

export const Text = cva([], {
  variants: {
    size: {
      normal: ["text-normal leading-5"],
      small: ["text-[13px] leading-5"],
      large: ["text-lg leading-6"]
    }
  },
  defaultVariants: {
    size: "normal"
  }
});
