import React from 'react'
import ReactDOM from 'react-dom/client'
import { profile, journey, experience, projects, toolbox, learning, certifications } from './data.js'
import { period, duration } from './dates.js'
import './resume.css'

// CV page — built entirely from data.js, so it stays in sync with the portfolio.
// "Download PDF" uses the browser's print dialog (Save as PDF); print styles give a clean A4 page.

const plain = (s) => s.replace(/`/g, '')
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const education = journey.filter((j) => j.kind === 'education')

function Section({ title, children }) {
  return (
    <section className="cv-section" id={title.toLowerCase()}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

function Resume() {
  const site = typeof window !== 'undefined' ? window.location.origin : ''
  return (
    <>
      <div className="toolbar">
        <a href="/" className="tb-link">← Back to portfolio</a>
        <button className="tb-btn" onClick={() => window.print()}>Download PDF</button>
      </div>

      <main className="sheet">
        <header className="cv-head">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv-role">{profile.role}</p>
            <p className="cv-loc">{profile.location}</p>
          </div>
          <ul className="cv-contact">
            <li><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><span>LinkedIn</span><a href={profile.linkedin}>{bare(profile.linkedin)}</a></li>
            {site && !site.includes('localhost') && <li><span>Portfolio</span><a href={site}>{bare(site)}</a></li>}
          </ul>
        </header>

        <Section title="Summary">
          <p>{profile.intro}</p>
        </Section>

        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.role} className="item">
              <div className="item-top">
                <strong>{e.role} · <span className="org">{e.org}</span></strong>
                <span className="when">{period(e.start, e.end)} · {duration(e.start, e.end)}</span>
              </div>
              <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} className="item">
              <div className="item-top">
                <strong>{p.title} <span className="muted">— {p.type}</span></strong>
                <span className="when links">
                  {p.live && <a href={p.live}>{bare(p.live)}</a>}
                </span>
              </div>
              <p>{p.summary}</p>
              <ul>{[...p.built.slice(0, 3), ...p.hard.slice(0, 2)].map((b) => <li key={b}>{plain(b)}</li>)}</ul>
              <p className="tech">{p.tech.join(' · ')}</p>
            </div>
          ))}
        </Section>

        <Section title="Education">
          {education.map((ed) => (
            <div key={ed.title} className="item">
              <div className="item-top">
                <strong>{ed.title} <span className="muted">— {ed.detail}</span></strong>
                <span className="when">{period(ed.start, ed.end)}</span>
              </div>
              <p className="org">{ed.place}{ed.grade && <span className="grade"> · {ed.grade}</span>}</p>
            </div>
          ))}
        </Section>

        {certifications.length > 0 && (
          <Section title="Certifications">
            <ul className="certs">
              {certifications.map((c) => (
                <li key={c.title}><strong>{c.title}</strong> <span className="muted">— {c.issuer}{c.year && `, ${c.year}`}</span></li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Skills">
          <dl className="skills">
            {toolbox.map((t) => (
              <div key={t.group}><dt>{t.group}</dt><dd>{t.items.join(', ')}</dd></div>
            ))}
            {learning.length > 0 && <div><dt>Learning</dt><dd>{learning.join(', ')}</dd></div>}
          </dl>
        </Section>
      </main>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Resume /></React.StrictMode>)
