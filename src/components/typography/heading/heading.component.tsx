import { type VariantProps } from "class-variance-authority";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { heading } from "./heading.variants";

interface HeadingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    Omit<VariantProps<typeof heading>, "type"> {}

export default {
  h1: ({ className, theme, ...props }: HeadingProps) => (
    <h1 className={heading({ type: "h1", theme, className })} {...props} />
  ),

  h2: ({ className, theme, ...props }: HeadingProps) => (
    <h2 className={heading({ type: "h2", theme, className })} {...props} />
  ),

  h3: ({ className, theme, ...props }: HeadingProps) => (
    <h3 className={heading({ type: "h3", theme, className })} {...props} />
  ),

  h4: ({ className, theme, ...props }: HeadingProps) => (
    <h4 className={heading({ type: "h4", theme, className })} {...props} />
  )
};
