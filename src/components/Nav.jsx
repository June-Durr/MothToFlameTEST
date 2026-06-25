import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/videos', label: 'Videos' },
  { to: '/bio', label: 'Bio' },
  { to: '/shows', label: 'Shows' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(5, 8, 16, 0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(245,239,230,0.06)'
            : '1px solid transparent',
          transition: 'all var(--transition-slow)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
          }}
        >
          <Logo
            size={26}
            className="animate-flicker"
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: 'var(--color-cream)',
              textTransform: 'uppercase',
            }}
          >
            Moth to Flame
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: 'var(--color-cream)',
                transition: 'all 0.3s ease',
                transformOrigin: 'center',
                transform:
                  open && i === 0
                    ? 'translateY(6px) rotate(45deg)'
                    : open && i === 2
                    ? 'translateY(-6px) rotate(-45deg)'
                    : open && i === 1
                    ? 'scaleX(0)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </header>

      <div
        className="menu-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          overflow: 'hidden',
          background:
            'radial-gradient(110% 75% at 50% 0%, rgba(13,42,50,0.55) 0%, transparent 55%), radial-gradient(95% 70% at 72% 100%, rgba(217,119,6,0.13) 0%, transparent 60%), rgba(5,8,16,0.98)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2.5rem',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {links.map((link, i) => {
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 7vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '0.1em',
                position: 'relative',
                zIndex: 1,
                color: isActive ? 'var(--color-amber-light)' : 'var(--color-cream)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: `opacity 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${open ? `${i * 80}ms` : '0ms'}, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${open ? `${i * 80}ms` : '0ms'}`,
                transform: open ? 'translateY(0)' : 'translateY(30px)',
                opacity: open ? 1 : 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-amber-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive
                  ? 'var(--color-amber-light)'
                  : 'var(--color-cream)'
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
