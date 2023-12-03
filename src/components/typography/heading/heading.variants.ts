import { cva } from "class-variance-authority";

export const heading = cva(["text-black-1 font-light"], {
  variants: {
    type: {
      h1: ["text-2xl leading-8", "md:text-[32px] md:leading-10"],
      h2: ["text-xl leading-6", "md:text-2xl md:leading-7"],
      h3: ["text-[17px] leading-6"],
      h4: ["text-[15px] leading-5"]
    },
    theme: {
      dark: "text-white",
      light: "text-black-1",
      auto: "text-black-1 dark:text-white"
    }
  },
  defaultVariants: {
    theme: "auto"
  }
});
