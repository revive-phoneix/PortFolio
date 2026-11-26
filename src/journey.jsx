import React from 'react'
import ReactDOM from 'react-dom/client'
import { journey } from './data.js'
import { period, duration } from './dates.js'
import './styles.css'

// Full timeline, oldest first — `journey` in data.js is kept latest-first for the homepage.
const ordered = [...journey].reverse()

function JourneyPage() {
  return (
    <>
      <header className="journey-page-bar wrap">
        <a href="/" className="back-link">← Back to portfolio</a>
      </header>

      <main className="wrap journey-page">
        <h1>My Journey</h1>
        <p className="journey-page-sub">Education and work, oldest to newest.</p>

        <div className="flow">
          {ordered.map((j, i) => (
            <div key={`${j.title}-${j.start}`} className="flow-step" style={{ '--d': `${i * 90}ms` }}>
              <span className="flow-dot" aria-hidden="true" />
              <div className="flow-card">
                <span className="tile-label">{period(j.start, j.end)}</span>
                <span className="step-dur">{duration(j.start, j.end)}</span>
                <strong>{j.title}</strong>
                <span className="step-place">{j.place}</span>
                {j.detail && <span>{j.detail}</span>}
                {j.grade && <span className="step-grade">{j.grade}</span>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><JourneyPage /></React.StrictMode>)
