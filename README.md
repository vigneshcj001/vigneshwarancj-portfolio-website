# Vigneshwaran C. J. — Portfolio Frontend

A React portfolio showcasing AI engineering, full-stack products, and computational biology research. It includes project case studies, an evidence-based portfolio assistant, a job-description match tool, and an interactive explanation of the assistant's architecture.

[Portfolio](https://vigneshwarancj-portfolio-website.vercel.app/) · [Codebase guide](CODEBASE.md) · [Maintenance notes](IMPROVEMENTS.md) · AI system design review: `AI_SYSTEM_DESIGN.md` in the backend repository

## Features

- Project search, category and stack filters kept in the URL (shareable, with copy-link), engineering case studies, and technical articles with an RSS feed (`/feed.xml`).
- Career timeline, education, certifications, skills, and research publications.
- ATS-friendly résumé downloads (PDF, DOCX, plain text) with static fallbacks from the same generator, an interactive role-to-stack timeline, and a single-column print layout.
- `/match`: paste a job description to get a requirement checklist, coverage, evidence links, and honest gaps.
- Streaming portfolio assistant with citations, contextual questions, specific operation summaries, saved conversations, verified browser action receipts, and live API status with an early warm-up.
- "Ask about this project" on every case study, plus guided tours and reviewable contact drafts that never submit themselves.
- Interactive `/assistant-architecture` explorer covering normal, contact, refusal, and routing-fallback paths.
- Seven language choices, Arabic RTL, persistent theme selection, keyboard search, and reduced-motion support.
- Contact form, newsletter subscription, public GitHub/PyPI activity, and a protected admin UI with a conversion funnel.

## Stack

React 19, React Router, Parcel, Tailwind CSS 4, Framer Motion, React Hook Form, Lucide, React Icons, EmailJS, Vercel Analytics, and Playwright.

## Local development

Use Node.js 22 and npm, matching the CI configuration. Run commands from this repository:

```powershell
npm ci
npm start -- --port 1234
```

Open [localhost:1234](http://localhost:1234). Without configuration, API requests use the deployed portfolio backend. To use a local backend instead, set the API origin **before** starting Parcel:

```powershell
$env:PORTFOLIO_API_URL = "http://127.0.0.1:8080"
npm start -- --port 1234
```

Start the companion backend separately and set its `FRONTEND_ORIGIN` to the exact browser origin, such as `http://localhost:1234`. `localhost` and `127.0.0.1` are different origins.

The static portfolio renders without a running backend. Assistant generation, dynamic translation, live PDF generation, metadata, storage-backed forms, demos, and admin operations depend on their configured services. Contact email delivery also requires the EmailJS service/template identified in `src/Utils/const.js`.

## Build and preview

```powershell
npm run build
npm run preview
```

Open [localhost:4173](http://127.0.0.1:4173), or go directly to [the architecture explorer](http://127.0.0.1:4173/assistant-architecture).

The build compiles canonical Markdown content when available, creates the Parcel bundle, copies committed public downloads/images, and generates route-specific metadata and a sitemap. It does not server-render the React page body. The preview server applies the security headers from `vercel.json`.

`PORTFOLIO_API_URL` is a build-time value. If changing the production backend origin, also update the CSP `connect-src` in `vercel.json`. The production CSP intentionally does not allow arbitrary local API origins.

## Content maintenance

The recommended workspace contains these sibling repositories:

```text
workspace/
├── vigneshwarancj-portfolio-website/
└── vigneshwarancj_portfolio_backend/
    └── knowledge/
```

Backend `knowledge/` Markdown is canonical for assistant facts and résumé data. `scripts/sync-portfolio-data.mjs` compiles it into `src/data/portfolio.generated.js` during prebuild. For a different content location, set `PORTFOLIO_CONTENT_ROOT` to the absolute knowledge-directory path. Standalone frontend builds use the committed generated snapshot when the Markdown index is unavailable.

Presentation files under `src/data/` also define project cards, experience, education, skills, publications, social links, case studies, and articles. Keep those views aligned with the canonical facts. Edit `src/data/assistantArchitecture.js` when backend tools, limits, models, or execution flow change.

The committed `resume.pdf`, `Vigneshwaran_CJ.docx`, and `resume.txt` are fallbacks for when the backend is asleep. They come from the backend's ATS generator, so they match the live downloads. Refresh them after content changes with either command:

```powershell
npm run resume:pdf                                  # downloads from the deployed backend
$env:RESUME_API_URL = "http://127.0.0.1:8080"; npm run resume:pdf   # from a local backend
```

or, offline from the backend repository, `python scripts/export_resume.py ../vigneshwarancj-portfolio-website`. Do not print the two-column web page to PDF: its layout is for on-screen reading, and parsers misread columns.

## Tests

Build first because the Node checks inspect generated output:

```powershell
npm run build
npm test
npx playwright install chromium-headless-shell
npm run preview
```

In another terminal:

```powershell
npm run test:browser
```

Browser suites cover portfolio navigation and responsive layouts, assistant feedback/actions/history, and architecture scenarios. Assistant and contact responses are mocked; these checks do not validate live model quality, production credentials, database connectivity, or email delivery. Screenshots are written under ignored `tmp/`.

Optional test variables: `PREVIEW_URL` selects another preview address, `CHROME_PATH` selects a system browser executable, and `PLAYWRIGHT_MODULE` selects an alternate Playwright module location. `npm run test:all` runs Node and browser checks but still requires a running preview and an existing build.

## Source layout

```text
App.js                    Routes, providers, and shared application shell
src/pages/                Portfolio pages and architecture explorer
src/Components/           Shared UI, assistant, diagrams, and demos
src/features/assistant/   Chat lifecycle, SSE parser, actions, and local storage
src/Hooks/                Metadata, translation, contact, and API status behavior
src/Contexts/             Language state
src/services/             Backend HTTP client (timeouts, readable errors)
src/config/               API origin configuration
src/data/                 Presentation content and generated résumé snapshot
src/styles/               Architecture explorer and feature styling
scripts/                  Content compilation, postbuild (sitemap, RSS), preview, résumé refresh
tests/                    Node checks and Playwright browser suites
vercel.json               Hosting rewrites and security/cache headers
```

For the full frontend/backend source map and data flows, read [CODEBASE.md](CODEBASE.md).

## Deployment and current limits

Vercel uses `npm run build` and publishes `dist/`. Direct-route rewrites preserve page-specific sharing metadata. GitHub Actions builds on Node 22, runs Node checks, installs Chromium, and runs browser suites against the production preview.

CI runs on pushes to `main` and on pull requests; pushes to other branches are built only through a pull request or a Vercel preview.

The architecture explorer explains the implementation; it is not live service telemetry. AI suggestions use curated templates, grounding can be imperfect, and browser session IDs are not authenticated accounts (they are random UUIDs, and Clear chat erases the server copy). Job match results come from documented portfolio content and do not replace a conversation. Admin revisions are stored but do not automatically update public pages. Newsletter subscriptions are stored; no mailing scheduler is implemented, so the RSS feed is the delivery channel for new notes.

## License

`package.json` declares ISC. No standalone license file is currently included.
