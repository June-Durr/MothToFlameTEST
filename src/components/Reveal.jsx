import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal — fades + lifts content the first time it scrolls into
 * view. Honors reduced motion via the app-level MotionConfig (the lift drops,
 * the fade stays). Render a different element with `as`, and any extra props
 * (style, className, onMouseEnter, href…) pass straight through to the element.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  duration = 0.8,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
