import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Videos from './pages/Videos'
import Bio from './pages/Bio'
import Shows from './pages/Shows'
import Contact from './pages/Contact'
import './index.css'

// Resets scroll to top whenever the route changes — without this, clicking
// links like "Read More" lands the new page mid-scroll wherever the user was.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Cinematic page transition: a slow fade + slight lift between routes.
// `initial={false}` skips the very first load so the hero's own entrance
// animation plays clean; navigations after that cross-fade. `mode="wait"`
// lets the outgoing page finish leaving before the next arrives.
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* reducedMotion="user" makes every motion component honor the OS
          "reduce motion" setting automatically (transforms drop, fades stay). */}
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        {/* Global atmosphere — depth wash + film grain over the near-black base */}
        <div className="page-atmosphere" aria-hidden="true" />
        <div className="page-grain" aria-hidden="true" />
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </MotionConfig>
    </BrowserRouter>
  )
}
