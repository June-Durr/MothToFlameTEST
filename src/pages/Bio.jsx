import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'

const BAND_BIO = `Moth to Flame, a genre-defying group, has been performing their unique blend of rock, latin, funk, progressive styles and fusion throughout the tri-state area since 2009. Influenced by Shorter, Hancock, Corea, Metheny, Jarrett, Jeff Beck, and Zawinul — as well as The Allman Brothers Band, Grateful Dead, and Rachmaninoff — Moth to Flame has thrilled audiences at venues as disparate as rock halls, intimate jazz clubs, and expansive outdoor festivals. Their eclectic mix of jazz, rhythm and blues, progressive rock, classical, funk, and world music can be heard on their first album of original compositions, soon to be released.`

// Default photo paths — overridden at runtime by /content/site/photos.json
// (Tyson can swap any of these via the CMS without redeploying)
const DEFAULT_PHOTOS = {
  tyson: '/assets/tyson.jpg',
  john: '/assets/john.jpg',
  ivo: '/assets/ivo.jpg',
  shariq: '/assets/shariq.jpg',
}

// Order requested by Tyson: guitar, bass, keys, drums
const MEMBERS = [
  {
    id: 'tyson',
    name: 'Tyson Harvey',
    role: 'Guitar',
    bio: `Tyson Harvey was bitten by the music bug at an early age in his hometown of Pittsburgh, PA, where his father's massive vinyl collection was on constant rotation. Before long, Tyson borrowed a "pawn-shop beater" guitar from a friend and has been a guitar addict ever since. His roots run deep with influences ranging from Robert Johnson and Weather Report to Pat Martino and Tower of Power, and he has a strong affection for jazz, funk, R&B, and even more esoteric progressive metal and world styles.`,
    photo: '/assets/tyson.jpg',
  },
  {
    id: 'john',
    name: 'John Krtil',
    role: 'Fretless Electric & Standup Bass',
    bio: `John Krtil resides in New York City and has been playing since 1973, with the occasional hiatus due to bad behavior. He has been a member of numerous jazz trios, quartets, and quintets, and was formally trained on standup with Milt Hinton in the 1970s. His influences include Jaco Pastorius, Percy Jones, Stanley Clarke, Alphonso Johnson, Paul Chambers, Ron Carter, Charles Mingus, Scott LaFaro, and Marc Johnson.`,
    photo: '/assets/john.jpg',
  },
  {
    id: 'ivo',
    name: 'Ivo Lorenz',
    role: 'Piano & Keyboards',
    bio: `Ivo Lorenz grew up in Switzerland and moved to New York City in 2002. A classically trained pianist, his playing is a true blend of styles ranging from jazz and rock to funk, R&B, and soul. Ivo has played in numerous jazz, funk, and fusion bands across both Europe and the US. His major influences include Chick Corea, Herbie Hancock, Keith Jarrett, Bill Evans, Thelonious Monk, Oscar Peterson, Brad Mehldau, and Miles Davis.`,
    photo: '/assets/ivo.jpg',
  },
  {
    id: 'shariq',
    name: 'Shariq Tucker',
    role: 'Drums',
    bio: `Shariq Tucker is an accomplished drummer from the Bronx, NY. He has been playing drums since the age of three, with early musical influences from his father Phil Tucker and his brother Tariq Tucker, a bassist. In his teen years, he studied with Richard Harrison at the Boys Club of New York Harlem — an experience that helped him pursue music as a career. Shariq has toured with Johnson Scales Four Orchestra, Jay White, MonoNeon (2011–2016), and the Stanley Clarke Band (2016–2019), and currently plays with Strawberry Sun and Moth to Flame. He won the Guitar Center Drum Off in 2014, securing endorsements with Evans and Promark.`,
    photo: '/assets/shariq.jpg',
  },
]

export default function Bio() {
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS)

  useEffect(() => {
    fetch('/content/site/photos.json')
      .then((r) => r.json())
      .then((data) => setPhotos({ ...DEFAULT_PHOTOS, ...data }))
      .catch(() => { /* fall back to defaults */ })
  }, [])

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>

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
            The Band
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-amber)', marginBottom: '3rem' }} />

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--color-cream-dim)',
              maxWidth: '780px',
              marginBottom: '5rem',
            }}
          >
            {BAND_BIO}
          </p>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3rem',
          }}
        >
          {MEMBERS.map((member, i) => {
            const photoSrc = photos[member.id] || member.photo
            return (
            <Reveal key={member.id} delay={(i % 2) * 0.1}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  background:
                    'linear-gradient(135deg, rgba(217,119,6,0.06) 0%, transparent 50%), linear-gradient(to bottom right, var(--color-teal) 0%, var(--color-void) 100%)',
                  border: '1px solid rgba(245,239,230,0.06)',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-cream-dim)',
                      opacity: 0.35,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Photo Pending
                  </div>
                )}
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  color: 'var(--color-cream)',
                  marginBottom: '0.4rem',
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-light)',
                  marginBottom: '1.25rem',
                }}
              >
                {member.role}
              </p>
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.75,
                  color: 'var(--color-cream-dim)',
                  opacity: 0.95,
                }}
              >
                {member.bio}
              </p>
            </Reveal>
            )
          })}
        </div>
      </div>
    </main>
  )
}
