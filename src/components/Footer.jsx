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
      {/* Social icons — URLs injected once Tyson provides them */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Facebook */}
        <a
          href="#" /* TODO: replace with Tyson's Facebook URL */
          aria-label="Facebook"
          style={{ color: 'var(--color-cream-dim)', transition: 'color var(--transition-base)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-amber-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-cream-dim)')}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="#" /* TODO: replace with Tyson's Instagram URL */
          aria-label="Instagram"
          style={{ color: 'var(--color-cream-dim)', transition: 'color var(--transition-base)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-amber-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-cream-dim)')}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>

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
