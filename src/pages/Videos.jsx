import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'

// Default video list — overridden at runtime by /content/site/videos.json
const DEFAULT_VIDEOS = [
  { id: 'A7f0O3nuQ-s', title: 'Incident at Neshabur' },
  { id: 'wTxFxE2tUzI', title: 'Palladium' },
  { id: 'pm5eSrEbvXI', title: 'Senor Mouse' },
  { id: 'skDtjYuCX9c', title: 'Cantaloupe Island' },
]

export default function Videos() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS)

  useEffect(() => {
    fetch('/content/site/videos.json')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.videos) && data.videos.length > 0) {
          setVideos(data.videos)
        }
      })
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
            Videos
          </h2>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'var(--color-amber)',
              marginBottom: '4rem',
            }}
          />
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '2.5rem',
          }}
        >
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={(i % 2) * 0.1}>
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  background: 'var(--color-deep-teal)',
                  border: 'none',
                  marginBottom: '1rem',
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={`Moth to Flame — ${video.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p
                className="font-display"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  color: 'var(--color-cream)',
                  fontStyle: 'italic',
                }}
              >
                {video.title}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
