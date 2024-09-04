"use client";

import React from "react";
import { motion, MotionProps, useInView } from "framer-motion";

interface AnimationWrapProps extends MotionProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  inViewDouble?: boolean;
}
const defaultInitial = { opacity: 0, y: 25 };
const defaultAnimate = { opacity: 1, y: 0 };
const defaultExit = { opacity: 0, y: 20 };
const defaultTransition = { duration: 0.6 };

const AnimationWrap: React.FC<AnimationWrapProps> = ({ children, initial = defaultInitial, animate = defaultAnimate, exit = defaultExit, transition = defaultTransition, threshold = 0.4, delay = 0, inViewDouble, ...props }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: inViewDouble ? false : true, amount: threshold });
  return (
    <motion.div ref={ref} initial={initial} animate={isInView ? animate : initial} exit={exit} transition={{ ...transition, delay: isInView ? delay : 0 }} {...props}>
      {children}
    </motion.div>
  );
};

export default AnimationWrap;
