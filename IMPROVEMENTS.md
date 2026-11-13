# Portfolio updates

## November 2026

- **Job match (`/match`).** Recruiters paste a job description and get a requirement checklist (strong, partial, gap), technology coverage, evidence links into the portfolio, and the gaps. If the AI assessment is unavailable, the keyword evidence still shows, with a notice.
- **ATS résumé.** The old static `resume.pdf` was printed from the two-column web page: 4 pages, with headings that extracted as `P R O F E S S I O N A L  S U M M A R Y`. The DOCX was built from 10 tables. Both are replaced by single-column PDF, DOCX, and TXT files from the backend generator: 2 pages, standard headings, contact details in the body, bullet points per deliverable. The résumé page offers all three, and printing it is single-column.
- **Discovery.** Shareable stack and category filters on Projects; "Ask about this project" on each case study; an interactive role-to-stack timeline on the résumé page; RSS at `/feed.xml`.
- **Assistant.** Real API status on the launcher with an early warm-up ping; Clear chat and Delete conversation erase the server copy; conversation IDs are random UUIDs (old guessable IDs are re-keyed automatically).
- **Reliability.** 45-second request timeouts for cold starts, readable messages for network errors, timeouts, and rate limits; loading, empty, and error states for live proof, newsletter, and demos.
- **Accessibility.** Small text raised to a legible minimum, keyboard focus styles that match hover effects, no stuck hover on touch screens.
- **Analytics.** First-party `page_view` (path only) and `case_study_view` events feed an admin conversion funnel.

Design review of the AI features, with measured retrieval quality and next steps: `AI_SYSTEM_DESIGN.md` in the backend repository.

The homepage highlights three featured systems, links to four case studies, provides a recruiter overview, and includes technical notes. The assistant now has a public `/assistant-architecture` explorer linked from the homepage, chat, footer, and command search. Full source map and current limitations: [CODEBASE.md](CODEBASE.md).

## AI architecture UI

`src/pages/AssistantArchitecture.js` and `src/data/assistantArchitecture.js` present the actual request path: validated question, restored context, Laya/local classification, bounded LangGraph tools, Groq generation, completed-turn persistence, and validated browser actions. Selectable contact, refusal, and fallback scenarios explain branching behavior. The explorer is an explanation, not live execution or service telemetry. Trying an example only fills the chat composer.

The route receives static title/description/canonical metadata in `postbuild.mjs`, a direct Vercel rewrite, and a generated sitemap entry. Keep its architecture data synchronized with the backend graph, tool registry, limits, and memory code.

## Content maintenance

- `src/data/showcase.js`: case studies, technical notes, approved testimonials, and project media.
- Canonical résumé and portfolio facts live in the backend repository's structured `knowledge/` Markdown tree. `npm run build` compiles those files into `src/data/portfolio.generated.js`; when building this repository alone, the committed generated module provides the same snapshot.
- Testimonials remain hidden. Add `{ approved: true, name, role, quote }` only after obtaining a real quote and permission.
- Optional media entries accept `poster`, `video` (MP4 URL), `captions` (WebVTT URL), and `transcript`. No fabricated screenshots or recordings are published.
- `projectMedia.syncly.liveAvailable` is false, hiding the inactive live link. Other project links follow current content configuration; documentation review does not establish live service availability.
- The technical notes are explanatory copy based on the listed project technologies; they do not claim undocumented implementation details or measured results. Review before publication.
- After structured content changes, run `npm run resume:pdf` (downloads from the backend generator) or the backend's `scripts/export_resume.py`. Commit the resulting `resume.pdf`, `Vigneshwaran_CJ.docx`, and `resume.txt`.

## Build and preview

Run `npm run build`, then `node scripts/preview.mjs` to preview locally. Run `npm test` to validate the generated assets and metadata. The build creates route-specific HTML metadata, social preview images, the sitemap, and a copy of the static PDF. Vercel rewrites serve these HTML files for direct links.

The build bypasses Parcel's cache because an existing cached build produced inconsistent dynamic-import mappings. All client-side routes still use React.

## Verification

`tests/browser.cjs` runs integration checks against an already running production preview at `http://127.0.0.1:4173`. Install Playwright in your development tooling, or set `PLAYWRIGHT_MODULE` to its module path. Set `CHROME_PATH` if using a system Chrome executable and `PREVIEW_URL` for a different preview address. Run `node tests/browser.cjs`.

`npm run test:browser` also runs `tests/assistant.browser.cjs` and `tests/architecture.browser.cjs`. Contact and assistant requests are intercepted, so no messages are sent and no AI credits are used. Checks cover direct routes, metadata, search, saved PDF bytes, download fallback, assistant stop/retry, operation summaries, action receipts, walkthroughs, unsent contact drafts, architecture scenarios, mobile overflow, and theme persistence. Generated screenshots belong under ignored `tmp/`.

## Analytics

Vercel and first-party analytics receive conversion events such as `project_demo_click`, `resume_download`, `resume_view`, and `contact_success`; assistant feedback uses the first-party event API. Call sites use project/source/version/rating metadata rather than form contents or chat text. Confirm custom-event availability in the deployed project's analytics dashboard. Demo events fire only for enabled live links.

## Still needs owner content

Real demo recordings, screenshots from working project sites, and approved testimonials. The public site omits empty sections. No deployment or external publication was performed.

