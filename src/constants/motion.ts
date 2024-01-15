import type { AnimationProps, TargetAndTransition, VariantLabels } from "framer-motion";

interface FramerMotionViewportProps {
  whileInView?: VariantLabels | TargetAndTransition;
  viewport?: {
    amount?: "some" | "all" | number;
    once?: boolean;
  };
}

export const defaultMotionAnimation: AnimationProps & FramerMotionViewportProps = {
  initial: {
    translateY: "250%"
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
};
