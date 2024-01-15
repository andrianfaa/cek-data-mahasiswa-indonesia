import { defaultMotionAnimation } from "@/constants";
import { type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { DetailedHTMLProps, HTMLAttributes, ReactHTML } from "react";
import { Text } from "./text.variant";

type TextProps<T extends keyof ReactHTML> = HTMLMotionProps<T> &
  VariantProps<typeof Text> & {
    className?: string;
    animated?: boolean;
  };

type DefaultTextProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T> & VariantProps<typeof Text>;

function isAnimatedText<TagName extends keyof ReactHTML, K = never>(
  text: TextProps<TagName> | DefaultTextProps<K>
): text is TextProps<TagName> {
  return "animated" in (text as TextProps<TagName>);
  // return (text as TextProps<TagName>).animated !== undefined;
}

export const Variant = Text;

export const p = (textProps: TextProps<"p"> | DefaultTextProps<HTMLParagraphElement>) => {
  if (isAnimatedText<"p", HTMLParagraphElement>(textProps)) {
    const props = {
      ...textProps,
      // just to pass the animated value to DOM
      "data-animated": textProps.animated && "true"
    };

    return (
      <motion.p
        {...props}
        animate={defaultMotionAnimation.animate}
        initial={defaultMotionAnimation.initial}
        transition={props.transition}
        whileInView={defaultMotionAnimation.whileInView}
        viewport={defaultMotionAnimation.viewport}
        className={Text({
          size: props.size,
          className: props.className
        })}
      />
    );
  }

  return <p {...textProps} />;
};

export const span = (textProps: TextProps<"span"> | DefaultTextProps<HTMLSpanElement>) => {
  if (isAnimatedText<"span", HTMLSpanElement>(textProps)) {
    const props = {
      ...textProps,
      // just to pass the animated value to DOM
      "data-animated": textProps.animated && "true"
    };

    return (
      <motion.span
        {...props}
        animate={defaultMotionAnimation.animate}
        initial={defaultMotionAnimation.initial}
        transition={props.transition}
        whileInView={defaultMotionAnimation.whileInView}
        viewport={defaultMotionAnimation.viewport}
        className={Text({
          size: props.size,
          className: props.className
        })}
      />
    );
  }

  return <span {...textProps} />;
};
