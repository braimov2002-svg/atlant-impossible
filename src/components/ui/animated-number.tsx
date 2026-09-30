"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

/** Spring-interpolated number — re-targets smoothly whenever `value` changes. */
export function AnimatedNumber({
  value,
  format = (v) => Math.round(v).toString(),
  className,
}: {
  value: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 90, damping: 20, mass: 0.8 });
  const text = useTransform(spring, format);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{text}</motion.span>;
}
