import type { AnimationProps } from "framer-motion";
import { FramerMotionViewportProps, DefaultAnimationProps } from "./motion";

export const defaultMotionAnimation: AnimationProps & FramerMotionViewportProps = ({
  initial,
  animate,
  whileInView,
  viewport
}: DefaultAnimationProps) => ({
  initial: {
    translateY: "150%",
    ...initial
  },
  animate: {
    translateY: 0
  },
  whileInView: {
    translateY: 0
  },
  viewport: {
    once: true
  }
});
