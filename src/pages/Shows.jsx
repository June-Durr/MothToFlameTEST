import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'

export default function Shows() {
  const [shows, setShows] = useState(null)

  useEffect(() => {
    fetch('/content/shows/shows.json')
      .then((r) => r.json())
      .then((data) => setShows(data.shows || []))
      .catch(() => setShows([]))
  }, [])

  const displayShows = shows ?? []

  return (
    <main
      style={{
        paddingTop: '8rem',
        paddingBottom: '6rem',
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric ember glows — sit behind content, dont fight the dark theme */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-150px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-150px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(13,42,50,0.7) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>

        <Reveal>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-cream)',
              marginBottom: '0.5rem',
            }}
          >
            Shows
          </h2>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'var(--color-amber)',
              marginBottom: '1rem',
            }}
          />
          <p
            style={{
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-amber)',
              opacity: 0.9,
              marginBottom: '4rem',
            }}
          >
            Live · Tri-State · 2026
          </p>
        </Reveal>

        {displayShows.length === 0 ? (
          <Reveal
            style={{
              padding: '3.5rem 2rem',
              textAlign: 'center',
              border: '1px solid rgba(245,239,230,0.06)',
              background:
                'linear-gradient(135deg, rgba(217,119,6,0.04) 0%, transparent 60%), rgba(13,42,50,0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 48 48"
              fill="none"
              style={{ margin: '0 auto 1.5rem', opacity: 0.5 }}
            >
              <path d="M24 8 C16 8 4 16 4 24 C4 18 12 14 24 14 C36 14 44 18 44 24 C44 16 32 8 24 8Z" fill="#d97706" opacity="0.7" />
              <path d="M24 26 C20 26 18 30 20 36 L24 40 L28 36 C30 30 28 26 24 26Z" fill="#ea580c" opacity="0.85" />
            </svg>
            <p
              className="font-display"
              style={{
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'var(--color-cream)',
                opacity: 0.85,
                marginBottom: '0.75rem',
              }}
            >
              No upcoming shows scheduled.
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-cream-dim)',
                opacity: 0.7,
              }}
            >
              Check back soon
            </p>
          </Reveal>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayShows.map((show, i) => (
              <Reveal
                key={i}
                delay={Math.min(i, 6) * 0.06}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr auto',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '2rem 1.5rem',
                  borderBottom: '1px solid rgba(245,239,230,0.08)',
                  borderLeft: '2px solid transparent',
                  transition:
                    'background var(--transition-base), border-color var(--transition-base)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgba(217,119,6,0.06) 0%, transparent 60%)'
                  e.currentTarget.style.borderLeftColor = 'var(--color-amber)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderLeftColor = 'transparent'
                }}
              >
                <div>
                  <p
                    className="font-display"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: 'var(--color-amber-light)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {show.date}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 400,
                      color: 'var(--color-cream)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {show.venue}
                  </p>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-cream-dim)',
                      opacity: 0.95,
                    }}
                  >
                    {show.city}
                  </p>
                </div>

                {show.ticketLink && show.ticketLink !== '#' ? (
                  <a
                    href={show.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-amber)',
                      textDecoration: 'none',
                      padding: '0.6rem 1.2rem',
                      border: '1px solid var(--color-amber)',
                      transition: 'all var(--transition-base)',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-amber)'
                      e.currentTarget.style.color = 'var(--color-void)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'var(--color-amber)'
                    }}
                  >
                    Tickets
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--color-cream-dim)',
                      opacity: 0.6,
                    }}
                  >
                    Soon
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
