import { useState } from 'react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const form = e.target
    const data = new FormData(form)

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem' }}>

        <Reveal as="h2"
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
          Contact
        </Reveal>
        <div style={{ width: '60px', height: '1px', background: 'var(--color-amber)', marginBottom: '1rem' }} />

        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: 'var(--color-cream-dim)',
            opacity: 0.7,
            marginBottom: '1rem',
          }}
        >
          Interested in booking Moth to Flame? Fill out the form below and we will be in touch.
        </p>

        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-cream-dim)',
            opacity: 0.6,
            marginBottom: '3rem',
          }}
        >
          Or email us directly at{' '}
          <a
            href="mailto:MothtoFlameBand@gmail.com"
            style={{
              color: 'var(--color-amber-light)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(217,119,6,0.4)',
              paddingBottom: '1px',
            }}
          >
            MothtoFlameBand@gmail.com
          </a>
        </p>

        <Reveal delay={0.12}>
        {submitted ? (
          <div
            style={{
              padding: '3rem',
              border: '1px solid rgba(217,119,6,0.3)',
              textAlign: 'center',
            }}
          >
            <p className="font-display" style={{ fontSize: '1.75rem', color: 'var(--color-amber-light)', marginBottom: '0.5rem' }}>
              Message Received
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-dim)', opacity: 0.7 }}>
              Thank you — we will get back to you soon.
            </p>
          </div>
        ) : (
          <form
            name="booking"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <input type="hidden" name="form-name" value="booking" />
            <input type="hidden" name="bot-field" style={{ display: 'none' }} />

            {[
              { name: 'name', label: 'Name', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
              { name: 'preferred-date', label: 'Preferred Date (optional)', type: 'text', required: false },
            ].map((field) => (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor={field.name}
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--color-cream-dim)',
                    opacity: 0.7,
                  }}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(245,239,230,0.2)',
                    padding: '0.75rem 0',
                    color: 'var(--color-cream)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color var(--transition-base)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = 'var(--color-amber)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(245,239,230,0.2)'
                  }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label
                htmlFor="message"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream-dim)',
                  opacity: 0.7,
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(245,239,230,0.2)',
                  padding: '0.75rem 0',
                  color: 'var(--color-cream)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color var(--transition-base)',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = 'var(--color-amber)'
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(245,239,230,0.2)'
                }}
              />
            </div>

            <div style={{ paddingTop: '0.5rem' }}>
              <Button onClick={() => {}} style={{ opacity: sending ? 0.5 : 1 }}>
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        )}
        </Reveal>
      </div>
    </main>
  )
}
