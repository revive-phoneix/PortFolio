import { useEffect, useRef, useState } from 'react'
import { profile, journey, projects, about, experience, toolbox, learning, certifications } from './data.js'
import { period, duration } from './dates.js'

const Arrow = ({ d = 'right' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`arrow arrow-${d}`}>
    {d === 'right' && <path d="M5 12h14M13 6l6 6-6 6" />}
    {d === 'out' && <path d="M7 17 17 7M8 7h9v9" />}
    {d === 'down' && <path d="M12 5v14M6 13l6 6 6-6" />}
  </svg>
)

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Adds `.in` to .fade / .reveal / .draw elements as they scroll into view
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade, .reveal, .draw')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Buttons with `.magnetic` drift toward the cursor
function useMagnetic() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return
    const els = [...document.querySelectorAll('.magnetic')]
    const move = (e) => {
      const el = e.currentTarget, r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
    }
    const leave = (e) => { e.currentTarget.style.transform = '' }
    els.forEach((el) => { el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave) })
    return () => els.forEach((el) => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) })
  }, [])
}

function useLocalTime(tz) {
  const f = () => new Date().toLocaleTimeString('en-IN', { timeZone: tz, hour: 'numeric', minute: '2-digit' })
  const [t, setT] = useState(f)
  useEffect(() => { const id = setInterval(() => setT(f()), 30000); return () => clearInterval(id) }, [])
  return t
}

// Render `code` spans inside data strings
const rich = (s) => s.split(/(`[^`]+`)/).map((p, i) => (p.startsWith('`') ? <code key={i}>{p.slice(1, -1)}</code> : p))

// Splits text into masked words that rise into place when an ancestor gets `.in`
function Split({ text, start = 0, step = 70, className = '' }) {
  return (
    <span className={`split ${className}`}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="w"><span style={{ '--d': `${start + i * step}ms` }}>{w}</span></span>
      )).reduce((acc, el, i) => (i ? [...acc, ' ', el] : [el]), [])}
    </span>
  )
}

function Header() {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const bar = useRef(null)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setSolid(window.scrollY > 12)
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      })
    }
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id === 'top' ? '' : e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top', 'work', 'about', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); io.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return (
    <header className={`header ${solid ? 'solid' : ''}`}>
      <div className="wrap header-row">
        <a href="#top" className="logo"><span className="logo-dot" />{profile.name}</a>
        <nav className="nav">
          {['work', 'about', 'contact'].map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{id[0].toUpperCase() + id.slice(1)}</a>
          ))}
          {profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer" className="nav-resume">Résumé <Arrow d="out" /></a>}
        </nav>
      </div>
      <div className="progress" ref={bar} />
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return
    const bg = el.querySelector('.hero-bg')
    const move = (e) => {
      const r = bg.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  // running word offset so all three headline lines stagger as one sequence
  let offset = 0
  return (
    <section id="top" className="hero wrap" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
        <span className="grid" />
        <span className="spot" />
      </div>

      <p className="eyebrow fade" style={{ '--d': '100ms' }}><span className="live" /> {profile.role} · {profile.location} · {profile.available}</p>
      <h1 className="reveal">
        {profile.headline.map((line, i) => {
          const start = 250 + offset * 70
          offset += line.split(' ').length
          return <Split key={i} text={line} start={start} className={`hl ${i === 2 ? 'serif' : ''}`} />
        })}
      </h1>
      <div className="hero-bottom">
        <p className="intro fade" style={{ '--d': '900ms' }}>{profile.intro}</p>
        <div className="hero-actions fade" style={{ '--d': '1050ms' }}>
          <a href="#work" className="btn btn-dark magnetic"><span>See my work</span> <Arrow d="down" /></a>
          <a href={`mailto:${profile.email}`} className="btn btn-line magnetic"><span>Email me</span></a>
        </div>
      </div>

      <h2 className="journey-heading fade" style={{ '--d': '1050ms' }}><Split text="My Journey" start={1050} /></h2>
      <div className="journey">
        <div className="journey-track draw" aria-hidden="true"><span /></div>
        {journey.slice(0, 3).map((j, i) => (
          <div key={j.title} className={`tile step fade ${j.current ? 'tile-now' : ''}`} style={{ '--d': `${1200 + i * 150}ms` }}>
            <span className="tile-label">{j.current && <span className="blink" />}{period(j.start, j.end)}</span>
            <span className="step-dur">{duration(j.start, j.end)}</span>
            <strong>{j.title}</strong>
            <span className="step-place">{j.place}</span>
            {j.detail && <span>{j.detail}</span>}
            {j.grade && <span className="step-grade">{j.grade}</span>}
          </div>
        ))}
      </div>
      <div className="journey-more fade" style={{ '--d': '1500ms' }}>
        <a href="/journey.html" className="btn btn-line magnetic"><span>View Full Journey</span> <Arrow /></a>
      </div>
    </section>
  )
}

function Marquee() {
  const items = toolbox.flatMap((t) => t.items)
  const row = items.map((it, i) => <span key={i}>{it}<i>✦</i></span>)
  return (
    <div className="marquee fade" aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  )
}

function Mock({ p }) {
  // Browser-frame illustration that tilts toward the cursor and animates when scrolled into view
  const ref = useRef(null)
  const move = (e) => {
    if (!finePointer() || reducedMotion()) return
    const el = ref.current, r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }
  const leave = () => { const el = ref.current; el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg') }
  return (
    <div className={`mock mock-${p.id}`} aria-hidden="true" ref={ref} onMouseMove={move} onMouseLeave={leave}>
      <div className="mock-bar"><i /><i /><i /><span>{p.live ? p.live.replace('https://', '') : p.title}</span></div>
      {p.id === 'sathee' ? (
        <div className="mock-body sathee">
          <div className="side"><b /><b /><b /><b /></div>
          <div className="main">
            <div className="cards"><div /><div /><div /></div>
            <svg viewBox="0 0 200 70" className="bars">
              {[28, 44, 36, 58, 40, 52, 30, 62].map((h, i) => <rect key={i} x={i * 25 + 4} y={70 - h} width="16" height={h} rx="3" style={{ '--i': i }} />)}
            </svg>
          </div>
        </div>
      ) : (
        <div className="mock-body iot">
          <div className="chips"><span>Devices</span><span>Alerts</span><span>Stats</span></div>
          <svg viewBox="0 0 200 80" className="line">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent)" stopOpacity=".22" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon className="area" points="0,62 25,50 50,56 75,34 100,42 125,22 150,30 175,14 200,24 200,80 0,80" fill="url(#area)" />
            <polyline pathLength="1" points="0,62 25,50 50,56 75,34 100,42 125,22 150,30 175,14 200,24" />
            <circle className="ping" cx="175" cy="14" r="4" />
            <circle className="dot" cx="175" cy="14" r="3.5" />
          </svg>
        </div>
      )}
      <span className="glare" />
    </div>
  )
}

function Project({ p, i }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="project fade">
      <div className="project-grid">
        <div className="project-text">
          <div className="project-meta"><span>0{i + 1}</span><span>{p.type}</span>{p.year && <span>{p.year}</span>}</div>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
          <p className="stack">{p.tech.map((t, j) => <span key={t} style={{ '--i': j }}>{t}</span>)}</p>
          <div className="project-links">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="link">Live site <Arrow d="out" /></a>}
            <button className="link toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? 'Hide case study' : 'Read case study'} <span className={`plus ${open ? 'x' : ''}`}>+</span>
            </button>
          </div>
        </div>
        <Mock p={p} />
      </div>

      <div className={`case ${open ? 'open' : ''}`}>
        <div className="case-inner">
          <div className="case-col" style={{ '--i': 0 }}>
            <h4>The problem</h4>
            <p>{p.problem}</p>
          </div>
          <div className="case-col" style={{ '--i': 1 }}>
            <h4>What I built</h4>
            <ul>{p.built.map((b) => <li key={b}>{rich(b)}</li>)}</ul>
          </div>
          <div className="case-col" style={{ '--i': 2 }}>
            <h4>Hard parts</h4>
            <ul>{p.hard.map((b) => <li key={b}>{rich(b)}</li>)}</ul>
          </div>
        </div>
      </div>
    </article>
  )
}

function Work() {
  return (
    <section id="work" className="section wrap">
      <div className="section-head fade">
        <h2><Split text="Selected work" start={100} /></h2>
        <p>Open a case study for the details.</p>
      </div>
      {projects.map((p, i) => <Project key={p.id} p={p} i={i} />)}
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section wrap">
      <div className="rule draw" />
      <div className="about-grid">
        <div className="fade">
          <h2><Split text="About" start={100} /></h2>
          {about.map((a) => <p key={a} className="about-p">{a}</p>)}
        </div>
        <div className="fade" style={{ '--d': '150ms' }}>
          <h4 className="small-head">Experience</h4>
          {experience.map((e) => (
            <div key={e.role} className="row">
              <div className="row-top"><strong>{e.role}</strong><span>{period(e.start, e.end)}</span></div>
              <div className="row-sub">{e.org}</div>
              <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
          {certifications.length > 0 && (
            <>
              <h4 className="small-head">Certifications</h4>
              <ul className="certs">
                {certifications.map((c) => (
                  <li key={c.title}><span>{c.title}</span><em>{c.issuer}{c.year && ` · ${c.year}`}</em></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="toolbox">
        <h4 className="small-head fade">Toolbox</h4>
        <div className="tool-grid">
          {toolbox.map((t, i) => (
            <div key={t.group} className="tool fade" style={{ '--d': `${i * 110}ms` }}>
              <span className="tool-group">{t.group}</span>
              <ul>{t.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
        {learning.length > 0 && (
          <p className="learning fade"><span className="small-head">Currently learning</span>{learning.join(' · ')}</p>
        )}
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${profile.email}` }
  }
  return (
    <section id="contact" className="contact wrap fade">
      <span className="contact-glow g1" aria-hidden="true" /><span className="contact-glow g2" aria-hidden="true" />
      <h2>
        <Split text="Hiring for a full-stack role?" start={150} step={60} /><br />
        <span className="talk">
          <Split text="Let’s talk." start={550} className="serif" />
          <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 9 C 50 2, 110 2, 198 7" /></svg>
        </span>
      </h2>
      <div className="contact-actions">
        <a href={`mailto:${profile.email}`} className="btn btn-dark magnetic"><span>{profile.email}</span></a>
        <button className="btn btn-line magnetic" onClick={copy}><span key={copied ? 'y' : 'n'} className="swap">{copied ? 'Copied ✓' : 'Copy email'}</span></button>
      </div>
      <div className="socials">
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">LinkedIn <Arrow d="out" /></a>
        {profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer" className="link">Résumé (PDF) <Arrow d="out" /></a>}
      </div>
    </section>
  )
}

function Footer() {
  const time = useLocalTime(profile.timezone)
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>{profile.location} · {time} IST</span>
    </footer>
  )
}

export default function App() {
  useReveal()
  useMagnetic()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
