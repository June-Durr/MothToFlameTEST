export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        padding: '4rem 2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        // Carries the Stay Close teal down and fades it to black, so the color
        // resolves into the footer instead of cutting off abruptly.
        background:
          'linear-gradient(to bottom, rgba(13, 42, 50, 0.28) 0%, var(--color-void) 100%)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: 'var(--color-cream-dim)',
          opacity: 0.5,
          textTransform: 'uppercase',
        }}
      >
        © {year} Moth to Flame — All Rights Reserved
      </p>
    </footer>
  )
}
