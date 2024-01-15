import { cva } from "class-variance-authority";

export const Badge = cva([], {
  variants: {
    size: {
      normal: ["py-1 px-2", "rounded", "text-sm"],
      small: ["py-0.5 px-1.5", "rounded", "text-[13px] leading-5"],
      large: ["py-1.5 px-2.5", "rounded"]
    },
    variant: {
      success: ["bg-state-success", "text-white"],
      warning: ["bg-state-warning", "text-white"],
      error: ["bg-state-error", "text-white"],
      info: ["bg-state-info", "text-white"],
      default: ["bg-black", "text-white"]
    }
  },
  defaultVariants: {
    size: "normal",
    variant: "default"
  }
});
