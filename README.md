# Manas Dixit — Portfolio

React + Vite single-page portfolio. Dark terminal-style design, no UI libraries.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## Edit content
Everything (text, projects, skills, links) is in **`src/data.js`**. Components read from it — you shouldn't need to touch `App.jsx` to update content.

Rule kept throughout: every claim is traceable to working code.

## Before deploying
1. Put your resume at **`public/resume.pdf`** (or set `resume: null` in `src/data.js` to hide the buttons).
2. Optional: replace the SVG schematics on project cards with real screenshots.

## Deploy on Vercel (free)
1. In Vercel, create a project for this application and select the **Vite** framework preset.
2. Click Deploy. You'll get `your-project.vercel.app`; add a custom domain later under Settings → Domains.
