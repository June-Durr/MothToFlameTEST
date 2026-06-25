// The band's moth/flame mark — extracted from the original hero so it can be
// reused as a proper logo (nav lockup, footer sign-off, etc.).
export default function Logo({ size = 28, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      role="img"
      aria-label="Moth to Flame"
    >
      <path
        d="M24 8 C16 8 4 16 4 24 C4 18 12 14 24 14 C36 14 44 18 44 24 C44 16 32 8 24 8Z"
        fill="#d97706"
        opacity="0.9"
      />
      <path
        d="M24 14 C16 14 4 22 8 32 C12 28 16 26 24 26 C32 26 36 28 40 32 C44 22 32 14 24 14Z"
        fill="#d97706"
        opacity="0.7"
      />
      <path
        d="M24 26 C20 26 18 30 20 36 L24 40 L28 36 C30 30 28 26 24 26Z"
        fill="#ea580c"
        opacity="0.9"
      />
    </svg>
  );
}
