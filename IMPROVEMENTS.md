# Portfolio updates

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
- Run `npm run resume:pdf` to refresh the saved PDF after structured content changes. Commit the resulting `resume.pdf`.

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

