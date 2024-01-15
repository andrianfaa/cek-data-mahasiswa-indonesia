import { defaultMotionAnimation } from "@/constants";
import { cx } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes, type ReactHTML } from "react";
import { Heading } from "./heading.variant";

type HeadingProps<T extends keyof ReactHTML> = HTMLMotionProps<T> & {
  className?: typeof cx;
  animated?: boolean;
};

type NormalHeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadingElement>;

function isAnimated<T extends keyof ReactHTML>(
  heading: HeadingProps<T> | NormalHeadingProps
): heading is HeadingProps<T> {
  return "animated" in (heading as HeadingProps<T>);
  // return (heading as HeadingProps<T>).animated !== undefined;
}

export const Variant = Heading;

export const h1 = (headingProps: HeadingProps<"h1"> | NormalHeadingProps) => {
  if (isAnimated(headingProps)) {
    const props = {
      ...headingProps,
      // just to pass the animated value to DOM
      "data-animated": headingProps.animated && "true"
    };

    return (
      <motion.h1
        {...props}
        animate={defaultMotionAnimation.animate}
        initial={defaultMotionAnimation.initial}
        transition={props.transition}
        whileInView={defaultMotionAnimation.whileInView}
        viewport={defaultMotionAnimation.viewport}
        className={Heading({
          type: "h1",
          className: props.className
        })}
      />
    );
  }

  return <h1 {...headingProps} />;
};

export const h2 = (headingProps: HeadingProps<"h2"> | NormalHeadingProps) => {
  if (isAnimated(headingProps)) {
    const props = {
      ...headingProps,
      // just to pass the animated value to DOM
      "data-animated": headingProps.animated && "true"
    };

    return (
      <motion.h2
        {...props}
        animate={defaultMotionAnimation.animate}
        initial={defaultMotionAnimation.initial}
        transition={props.transition}
        whileInView={defaultMotionAnimation.whileInView}
        viewport={defaultMotionAnimation.viewport}
        className={Heading({
          type: "h2",
          className: props.className
        })}
      />
    );
  }

  return <h2 {...headingProps} />;
};

export const h3 = (headingProps: HeadingProps<"h3"> | NormalHeadingProps) => {
  if (isAnimated(headingProps)) {
    const props = {
      ...headingProps,
      // just to pass the animated value to DOM
      "data-animated": headingProps.animated && "true"
    };

    return (
      <motion.h3
        {...props}
        animate={defaultMotionAnimation.animate}
        initial={defaultMotionAnimation.initial}
        transition={props.transition}
        whileInView={defaultMotionAnimation.whileInView}
        viewport={defaultMotionAnimation.viewport}
        className={Heading({
          type: "h3",
          className: props.className
        })}
      />
    );
  }

  return <h3 {...headingProps} />;
};

export const h4 = (headingProps: HeadingProps<"h4"> | NormalHeadingProps) => {
  if (isAnimated(headingProps)) {
    const props = {
      ...headingProps,
      // just to pass the animated value to DOM
      "data-animated": headingProps.animated && "true"
    };

    return (
      <motion.h4
        {...props}
        animate={defaultMotionAnimation.animate}
        initial={defaultMotionAnimation.initial}
        transition={props.transition}
        whileInView={defaultMotionAnimation.whileInView}
        viewport={defaultMotionAnimation.viewport}
        className={Heading({
          type: "h4",
          className: props.className
        })}
      />
    );
  }

  return <h4 {...headingProps} />;
};
