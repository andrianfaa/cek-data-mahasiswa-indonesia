import { cva } from "class-variance-authority";

export const Input = cva([], {
  variants: {
    inputType: {
      text: [
        "border border-gray-4 rounded hover:border-black-1 focus:border-black-1",
        "outline-none",
        "px-4 py-3 md:px-6 md:py-4"
      ]
    }
  },
  defaultVariants: {
    inputType: "text"
  }
});
