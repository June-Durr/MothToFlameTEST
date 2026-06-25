import { Link } from 'react-router-dom'

export default function Button({ children, onClick, href, variant = 'primary', style: extraStyle = {} }) {
  const base = {
    display: 'inline-block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    padding: '0.9rem 2.5rem',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all var(--transition-base)',
    ...extraStyle,
  }

  const variants = {
    primary: {
      background: 'transparent',
      borderColor: 'var(--color-amber)',
      color: 'var(--color-amber-light)',
    },
    ghost: {
      background: 'transparent',
      borderColor: 'rgba(245,239,230,0.3)',
      color: 'var(--color-cream)',
    },
  }

  const styles = { ...base, ...variants[variant] }

  const handleHover = (e, entering) => {
    if (variant === 'primary') {
      e.currentTarget.style.background = entering ? 'var(--color-amber)' : 'transparent'
      e.currentTarget.style.color = entering ? 'var(--color-void)' : 'var(--color-amber-light)'
    } else {
      e.currentTarget.style.borderColor = entering ? 'var(--color-cream)' : 'rgba(245,239,230,0.3)'
    }
  }

  // Internal route → use react-router Link to avoid full page reload
  if (href && href.startsWith('/')) {
    return (
      <Link
        to={href}
        style={styles}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </Link>
    )
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={styles}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      style={styles}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </button>
  )
}
