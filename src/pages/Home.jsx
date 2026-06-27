import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Hero from "../components/Hero";

const DEFAULT_FEATURED_VIDEOS = [
  { id: "A7f0O3nuQ-s", title: "Incident at Neshabur" },
  { id: "wTxFxE2tUzI", title: "Palladium" },
  { id: "pm5eSrEbvXI", title: "Senor Mouse" },
];
const DEFAULT_PHOTOS = { band: "/assets/band.jpg" };

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function Home() {
  const [shows, setShows] = useState([]);
  const [featuredVideos, setFeaturedVideos] = useState(DEFAULT_FEATURED_VIDEOS);
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [aboutTextRef, aboutTextInView] = useReveal();
  const [aboutPhotoRef, aboutPhotoInView] = useReveal();
  const [videosHeaderRef, videosHeaderInView] = useReveal();
  const [videosGridRef, videosGridInView] = useReveal();
  const [showsBlockRef, showsBlockInView] = useReveal();
  const [followBlockRef, followBlockInView] = useReveal();

  useEffect(() => {
    fetch("/content/shows/shows.json")
      .then((r) => r.json())
      .then((d) => setShows(d.shows || []))
      .catch(() => setShows([]));
    fetch("/content/site/videos.json")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.videos) && d.videos.length)
          setFeaturedVideos(d.videos.slice(0, 3));
      })
      .catch(() => {});
    fetch("/content/site/photos.json")
      .then((r) => r.json())
      .then((d) => setPhotos({ ...DEFAULT_PHOTOS, ...d }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!activeVideoId) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveVideoId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideoId]);

  const nextShows = shows.slice(0, 3);

  return (
    <main>
      <Hero bandPhoto="/assets/band2.webp" />

      <section
        style={{
          padding: "clamp(5rem, 12vw, 9rem) 1.5rem",
          background:
            "linear-gradient(to bottom, var(--color-void) 0%, rgba(13, 42, 50, 0.5) 50%, rgba(13, 42, 50, 0.3) 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(2.5rem, 6vw, 5rem)",
            alignItems: "center",
          }}
        >
          <div
            ref={aboutTextRef}
            className={`reveal-left ${aboutTextInView ? "in-view" : ""}`}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--color-amber)",
                marginBottom: "1.5rem",
              }}
            >
              The Band
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                lineHeight: 1.1,
                color: "var(--color-cream)",
                marginBottom: "2rem",
              }}
            >
              Drawn to the{" "}
              <span
                style={{ fontStyle: "italic" }}
                className="text-flame-gradient"
              >
                fire
              </span>
              .
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--color-cream-dim)",
                marginBottom: "2.5rem",
                maxWidth: "480px",
              }}
            >
              A genre-defying group performing their unique blend of rock,
              latin, funk, progressive styles, and fusion throughout the
              tri-state area since 2009. Influenced by Shorter, Hancock, Corea,
              Metheny, Jarrett, Jeff Beck, and Zawinul — heard at rock halls,
              intimate jazz clubs, and outdoor festivals alike.
            </p>
            <Button href="/bio" variant="ghost">
              Read More
            </Button>
          </div>
          <div
            ref={aboutPhotoRef}
            className={`reveal-right ${aboutPhotoInView ? "in-view" : ""}`}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              background: "var(--color-void)",
              overflow: "hidden",
            }}
          >
            <img
              src={photos.band}
              alt="Moth to Flame"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 60%, rgba(5,8,16,0.45) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle, rgba(217,119,6,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(5rem, 12vw, 9rem) 1.5rem",
          background:
            "radial-gradient(70% 45% at 28% 50%, rgba(217,119,6,0.06) 0%, transparent 62%), linear-gradient(to bottom, rgba(5,8,16,0.72) 0%, rgba(5,8,16,0.85) 50%, rgba(5,8,16,0.72) 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            ref={videosHeaderRef}
            className={`reveal-up ${videosHeaderInView ? "in-view" : ""}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "2rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--color-amber)",
                  marginBottom: "0.75rem",
                }}
              >
                Watch
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  color: "var(--color-cream)",
                }}
              >
                Latest Videos
              </h2>
            </div>
            <Link
              to="/videos"
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-amber-light)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-amber)",
                paddingBottom: "0.25rem",
              }}
            >
              See all
            </Link>
          </div>
          <div
            ref={videosGridRef}
            className={`reveal-up ${videosGridInView ? "in-view" : ""}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featuredVideos.map((video) => {
              const isPlaying = activeVideoId === video.id;
              return (
                <div
                  key={video.id}
                  className="video-card"
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    backgroundImage: isPlaying
                      ? "none"
                      : `url(https://img.youtube.com/vi/${video.id}/hqdefault.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "var(--color-void)",
                    border: "none",
                    overflow: "hidden",
                  }}
                >
                  {isPlaying ? (
                    <>
                      <iframe
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <button
                        onClick={() => setActiveVideoId(null)}
                        aria-label="Close video"
                        className="video-card-close"
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          zIndex: 2,
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "rgba(5,8,16,0.85)",
                          border: "1px solid rgba(217,119,6,0.5)",
                          color: "var(--color-cream)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1rem",
                          lineHeight: 1,
                          padding: 0,
                        }}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setActiveVideoId(video.id)}
                      aria-label={`Play ${video.title}`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "radial-gradient(ellipse at center, transparent 25%, rgba(5,8,16,0.75) 100%), linear-gradient(to bottom, rgba(5,8,16,0.45) 0%, rgba(5,8,16,0.85) 100%)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          border: "1px solid var(--color-amber)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(5,8,16,0.6)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="var(--color-amber-light)"
                          style={{ marginLeft: "3px" }}
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p
                        className="font-display"
                        style={{
                          position: "absolute",
                          bottom: "1rem",
                          left: "1.25rem",
                          right: "1.25rem",
                          fontSize: "1.1rem",
                          fontStyle: "italic",
                          fontWeight: 400,
                          color: "var(--color-cream)",
                          textAlign: "left",
                          margin: 0,
                          pointerEvents: "none",
                        }}
                      >
                        {video.title}
                      </p>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(5rem, 12vw, 9rem) 1.5rem",
          background:
            "radial-gradient(62% 42% at 50% 52%, rgba(234,88,12,0.07) 0%, transparent 64%), linear-gradient(to bottom, rgba(13, 42, 50, 0.3) 0%, rgba(13, 42, 50, 0.5) 50%, rgba(13, 42, 50, 0.3) 100%)",
        }}
      >
        <div
          ref={showsBlockRef}
          className={`reveal-up ${showsBlockInView ? "in-view" : ""}`}
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--color-amber)",
                marginBottom: "0.75rem",
              }}
            >
              On Stage
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "var(--color-cream)",
              }}
            >
              Upcoming Shows
            </h2>
          </div>
          {nextShows.length === 0 ? (
            <p
              className="font-display"
              style={{
                fontSize: "1.25rem",
                fontStyle: "italic",
                color: "var(--color-cream-dim)",
                opacity: 0.75,
                textAlign: "center",
              }}
            >
              No upcoming shows scheduled. Check back soon.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {nextShows.map((show, i) => (
                <div
                  key={i}
                  className="show-row"
                  style={{
                    padding: "1.75rem 0",
                    borderBottom: "1px solid rgba(245,239,230,0.08)",
                  }}
                >
                  <p className="show-row__date">{show.date}</p>
                  <div>
                    <p
                      className="show-row__venue"
                      style={{
                        fontSize: "1rem",
                        color: "var(--color-cream)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {show.venue}
                    </p>
                    <p
                      className="show-row__city"
                      style={{
                        fontSize: "0.78rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--color-cream-dim)",
                        opacity: 0.9,
                      }}
                    >
                      {show.city}
                    </p>
                  </div>
                  {show.ticketLink && show.ticketLink !== "#" ? (
                    <a
                      href={
                        show.ticketLink.startsWith("http")
                          ? show.ticketLink
                          : `https://${show.ticketLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="show-row__action"
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-amber)",
                        textDecoration: "none",
                        padding: "0.5rem 1rem",
                        border: "1px solid var(--color-amber)",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      Tickets
                    </a>
                  ) : (
                    <span
                      className="show-row__action"
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-cream-dim)",
                        opacity: 0.6,
                      }}
                    >
                      Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Button href="/shows">All Dates</Button>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(5rem, 12vw, 8rem) 1.5rem",
          background:
            "linear-gradient(to bottom, rgba(13, 42, 50, 0.3) 0%, rgba(13, 42, 50, 0.55) 45%, rgba(13, 42, 50, 0.28) 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(217,119,6,0.13) 0%, transparent 62%)",
            pointerEvents: "none",
          }}
        />
        <div
          ref={followBlockRef}
          className={`reveal-up ${followBlockInView ? "in-view" : ""}`}
          style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "1rem",
            }}
          >
            Stay Close
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-cream)",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            Follow us where the fire spreads.
          </h2>

          {/* Social links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(1.5rem, 5vw, 3rem)",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Facebook",
                href: "#",
                icon: (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/moth_to_flame_band/",
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.6rem",
                  color: "var(--color-cream-dim)",
                  textDecoration: "none",
                  transition: "color var(--transition-base)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-amber-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-dim)")}
              >
                {icon}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>

          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(217,119,6,0.35)",
              margin: "0 auto 2.5rem",
            }}
          />

          <Button href="/contact" style={{ marginTop: "1rem" }}>
            Book the Band
          </Button>
        </div>
      </section>
    </main>
  );
}
