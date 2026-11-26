// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file, not the components.
//  Rule: every claim must be traceable to working code.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Manas Dixit',
  role: 'Full Stack Developer',
  location: 'Kanpur, India',
  timezone: 'Asia/Kolkata',
  available: 'Open to full-time roles',
  headline: ['I build web apps', 'end to end —', 'and keep them running.'],
  intro:
    'React on the front, Node.js and Express behind it, Firebase or MongoDB underneath. Right now I’m the only developer on HCL SATHEE, a portal used by coaching centres in three states.',
  email: 'manasdixit4100@gmail.com',
  linkedin: 'https://www.linkedin.com/in/manas-dixit-840b30276',
  // CV page generated from this file (resume.html). Set to null to hide the links.
  resume: '/resume.html',
}

// Hero timeline — latest first. Dates are 'DD-MM-YYYY'; leave `end` null for ongoing (shown as Present).
// The period label and duration (e.g. "1 yr 10 mos") are calculated from these.
// `kind: 'education'` entries also appear under Education on the CV page.
export const journey = [
  { start: '13-10-2026', end: '13-11-2026', title: 'Assistant Manager', place: 'Dean of Resources & Alumni, IIT Kanpur', detail: 'One-month contract covering DoRA ahead of the SMC GCC 4.0 summit' },
  { start: '01-07-2026', end: '01-10-2026', title: 'Research Intern', place: 'IIT Kanpur', detail: 'Building and maintaining HCL SATHEE' },
  { start: '01-08-2024', end: '01-05-2026', kind: 'education', title: 'MCA', place: 'Amity University, Lucknow', detail: 'Master of Computer Applications', grade: '8.25 CGPA · First Division' },
  { start: '01-09-2021', end: '01-06-2024', kind: 'education', title: 'BCA', place: 'Virendra Swarup Institute of Computer Studies, Kanpur', detail: 'Bachelor of Computer Applications', grade: '8.03 CGPA · First Division' },
]

export const projects = [
  {
    id: 'sathee',
    title: 'HCL SATHEE',
    type: 'Production app',
    year: '2026',
    summary:
      'A student management portal for HCL’s coaching centres — attendance, test marks, equipment, analytics and push notifications. I designed, built, deployed and maintain it on my own.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Firestore', 'Firebase Storage', 'FCM', 'JWT', 'SheetJS', 'Recharts'],
    live: 'https://hcl-sathee.vercel.app',
    problem:
      'HCL runs coaching centres in Rajasthan, Jharkhand and Madhya Pradesh. Admins, HCL partners and on-ground teachers (Sathee Mitras) needed one place to track students, attendance and results — each seeing only what their role allows.',
    built: [
      'Three roles — Admin, Partner (view-only), Sathee Mitra — with role-gated routes and a `readOnly` mode passed through the views',
      'Invite-only onboarding using JWT links that expire in 10 minutes',
      'Push notifications through Firebase Cloud Messaging (VAPID + service worker)',
      'Attendance with live camera selfies for teachers, plus separate attendance for visiting mentors',
      'Test-marks upload with bulk Excel/CSV import (SheetJS) and validation',
      'Animated dashboards (Recharts) with XLSX/SVG export',
      'Centres managed from a Firestore collection instead of a hardcoded list',
    ],
    hard: [
      'Found an account-takeover hole in forgot-password (no inbox verification) and fixed it — then caught a follow-up bug where a raw Firestore Timestamp silently switched off OTP expiry',
      'Render’s free-tier cold starts were breaking password setup for new users; rewrote the API client to retry on 502/503/504',
      'Moved a 197-item equipment catalog into a static module, so searching it costs zero Firestore reads',
      'Replaced the `xlsx` npm package after a HIGH-severity advisory with the official SheetJS build',
    ],
  },
  {
    id: 'iot',
    title: 'Smart Home IoT Monitoring',
    type: 'Personal project',
    year: '',
    summary:
      'A dashboard to register smart-home devices, switch them on and off, track power use per device and handle alerts — with a script that simulates device readings against the API.',
    tech: ['React 19', 'Vite', 'Chart.js', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Google OAuth'],
    live: null,
    problem:
      'I wanted to practise a complete backend: authentication, a real data model and time-series-style readings — then show it all on one dashboard.',
    built: [
      'Signup/login plus Google sign-in (ID-token flow), profile and settings endpoints',
      'Device create/list and on/off toggling',
      'Per-device power history with Chart.js views',
      'Alerts: list, resolve one, resolve all, clear',
      'Seed and migration scripts to bootstrap devices, alerts and power history',
    ],
    hard: [
      'Layered the Express backend as routes → controllers → Mongoose models, with middleware kept separate',
      'Wrote `add_power_data.js` to push simulated readings through the API for testing',
      'Kept every frontend API call in one Axios service module',
    ],
  },
]

export const about = [
  'I completed my MCA at Amity University, Lucknow, in 2026 and now work as a research intern at IIT Kanpur.',
  'Most of what I know comes from shipping one real product and fixing it when it broke — security bugs, hosting limits, emails landing in spam. I like work where the code has actual users.',
]

export const experience = [
  {
    role: 'Assistant Manager',
    org: 'Dean of Resources & Alumni, IIT Kanpur',
    start: '13-10-2026',
    end: '13-11-2026',
    points: [
      'Joined the Department of Resources and Alumni (DoRA) on a one-month contract to cover an urgent staffing need ahead of the SMC GCC 4.0 summit in Lucknow (26–27 Oct 2026)',
      'Maintained and updated the Startup Master Class (SMC) website (iitkalumni.org/SMC) after the event',
      'Designed social media posts for LinkedIn and Instagram for alumni outreach and event promotion',
      'Managed alumni communication and coordination for IIT Kanpur',
    ],
  },
  {
    role: 'Research Intern',
    org: 'IIT Kanpur',
    start: '01-07-2026',
    end: '01-10-2026',
    points: [
      'Sole full-stack developer of HCL SATHEE, a production portal for HCL’s coaching centres',
      'Own feature design, React frontend, Express API, Firestore data model, deployment (Vercel + Render) and production fixes',
    ],
  },
]

export const certifications = [
  { title: 'React, NodeJS, Express & MongoDB — The MERN Fullstack Guide', issuer: 'Udemy', year: '2026' },
  { title: 'Java Masterclass 2025', issuer: 'Udemy', year: '2025' },
  { title: 'Introduction to Cloud Computing (AWS)', issuer: 'Udemy', year: '' },
  { title: 'MERN Stack Workshop', issuer: 'WEBCOS Software Solutions', year: '' },
  { title: 'Cyber Security & Ethical Hacking', issuer: 'SKDEFT Technologies', year: '' },
]

export const toolbox = [
  { group: 'Frontend', items: ['React', 'JavaScript (ES6+)', 'Vite', 'HTML & CSS', 'Axios', 'Recharts / Chart.js', 'Service Workers'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT auth', 'Google OAuth', 'Gmail OAuth2 (email)', 'Firebase Cloud Messaging'] },
  { group: 'Data', items: ['Firestore', 'Firebase Storage', 'MongoDB + Mongoose', 'SheetJS (Excel/CSV)'] },
  { group: 'Shipping', items: ['Vercel', 'Render'] },
]

// Shown as a small line under the toolbox — kept out of the skills grid and the marquee
export const learning = ['Java']
