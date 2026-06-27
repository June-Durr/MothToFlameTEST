import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "./Button";

export default function Hero({ bandPhoto = "/assets/band.jpg" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Read synchronously on first render so parallax is never active on mobile
  const [isMobile] = useState(() => window.innerWidth < 640);

  // Parallax: photo drifts down + scales slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Slow, deliberate entrance — feels like a curtain rising, not a UI toast.
  const ease = [0.22, 1, 0.36, 1];
  const line = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease, delay: 0.3 + i * 0.18 },
    }),
  };
  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease, delay } },
  });

  return (
    <section
      ref={ref}
      className="hero-section"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "640px",
        overflow: "hidden",
        background: "var(--color-void)",
      }}
    >
      {/* Parallax background photo */}
      <motion.div
        className="hero-photo"
        style={{
          "--hero-bg": `url(${bandPhoto})`,
          position: "absolute",
          inset: 0,
          zIndex: 0,
          y: (reduce || isMobile) ? 0 : photoY,
          scale: reduce ? 1.08 : photoScale,
          willChange: "transform",
        }}
      />

      {/* Darkening + directional gradient. The band1 image is already dark and
          ember-lit, so this is light: it only grounds the lower-right where the
          type sits (so cream + ember letters stay legible) and keeps faces and
          the smoke fully visible. */}
      <div
        className="hero-gradient"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to left, rgba(5,8,16,0.12) 0%, rgba(5,8,16,0.08) 50%, rgba(5,8,16,0.02) 80%, rgba(5,8,16,0.08) 100%), linear-gradient(to top, rgba(5,8,16,0.9) 0%, rgba(5,8,16,0.45) 45%, rgba(5,8,16,0.05) 70%, rgba(5,8,16,0.18) 100%)",
        }}
      />

      {/* Living ember glow — low-right, flickering like firelight behind the type */}
      <motion.div
        aria-hidden
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.55, 0.85, 0.5, 0.95, 0.65, 0.8],
                scale: [1, 1.06, 0.98, 1.08, 1.01, 1.04],
              }
        }
        transition={{
          duration: 6.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          right: "-10%",
          bottom: "-15%",
          width: "70vw",
          height: "70vh",
          zIndex: 2,
          pointerEvents: "none",
          mixBlendMode: "screen",
          background:
            "radial-gradient(circle at 65% 65%, rgba(234,88,12,0.16) 0%, rgba(217,119,6,0.08) 30%, transparent 62%)",
        }}
      />

      {/* Film grain */}
      <div className="hero-grain" />

      {/* Content — anchored bottom-RIGHT, asymmetric */}
      <motion.div
        className="hero-content"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          y: (reduce || isMobile) ? 0 : contentY,
          opacity: (reduce || isMobile) ? 1 : contentFade,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          padding:
            "0 clamp(1.5rem, 6vw, 6rem) clamp(3.5rem, 9vh, 6rem)",
        }}
      >
        <h1
          className="font-display hero-title"
          style={{
            margin: 0,
            lineHeight: 0.9,
            color: "var(--color-cream)",
            letterSpacing: "0.04em",
            textAlign: "right",
          }}
        >
          <motion.span
            custom={0}
            variants={line}
            initial="hidden"
            animate="show"
            style={{
              display: "block",
              fontSize: "clamp(3.5rem, 11vw, 9rem)",
              fontWeight: 300,
              textTransform: "uppercase",
            }}
          >
            Moth
          </motion.span>
          <motion.span
            custom={1}
            variants={line}
            initial="hidden"
            animate="show"
            className="text-flame-gradient"
            style={{
              display: "block",
              fontSize: "clamp(2.8rem, 9vw, 7.5rem)",
              whiteSpace: "nowrap",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.01em",
              marginRight: "clamp(0.5rem, 5vw, 4rem)",
            }}
          >
            to Flame
          </motion.span>
        </h1>

        <motion.p
          className="hero-eyebrow"
          variants={fadeUp(0.8)}
          initial="hidden"
          animate="show"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.6rem, 1.2vw, 0.78rem)",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--color-amber-light)",
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
          }}
        >
          Genre-Defying · Tri-State · Since 2009
          <span
            style={{
              width: "clamp(20px, 3vw, 40px)",
              height: "1px",
              background: "var(--color-amber)",
              display: "inline-block",
            }}
          />
        </motion.p>

        <motion.div
          variants={fadeUp(1.05)}
          initial="hidden"
          animate="show"
          style={{
            marginTop: "clamp(1.25rem, 3vh, 2rem)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Button href="/shows">Upcoming Shows</Button>
          <Button href="/contact" variant="ghost">
            Book Us
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue — bottom left, opposite the type for balance */}
      <motion.div
        className="hero-scroll-cue"
        variants={fadeUp(1.6)}
        initial="hidden"
        animate="show"
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 6vw, 6rem)",
          bottom: "clamp(2rem, 5vh, 3rem)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-cream-dim)",
            opacity: 0.7,
          }}
        >
          Scroll
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "42px",
            background:
              "linear-gradient(to bottom, var(--color-amber-light), transparent)",
            display: "block",
          }}
        />
      </motion.div>
    </section>
  );
}
