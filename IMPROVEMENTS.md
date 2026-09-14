# Portfolio updates

The homepage now highlights work, links to two case studies, provides a recruiter overview, and includes technical notes. The existing publications, skills, and social pages remain accessible through the footer.

## Content maintenance

- `src/data/showcase.js`: case studies, technical notes, approved testimonials, and project media.
- Testimonials remain hidden. Add `{ approved: true, name, role, quote }` only after obtaining a real quote and permission.
- Optional media entries accept `poster`, `video` (MP4 URL), `captions` (WebVTT URL), and `transcript`. No fabricated screenshots or recordings are published.
- Both featured live previews are disabled after checks on 2026-09-07: Syncly redirected to an unrelated domain; GlycanBench returned HTTP 502. Once the intended sites work, set `liveAvailable: true` in the relevant media entry.
- The technical notes are explanatory copy based on the listed project technologies; they do not claim undocumented implementation details or measured results. Review before publication.
- Run `python scripts/build_resume.py` with ReportLab installed to refresh the saved PDF from the sibling backend's portfolio data. Commit the resulting `resume.pdf`. The saved PDF is a concise alternative to the backend-generated version.

## Build and preview

Run `npm run build`, then `node scripts/preview.mjs` to preview locally. Run `npm test` to validate the generated assets and metadata. The build creates route-specific HTML metadata, social preview images, the sitemap, and a copy of the static PDF. Vercel rewrites serve these HTML files for direct links.

The build bypasses Parcel's cache because an existing cached build produced inconsistent dynamic-import mappings. All client-side routes still use React.

## Verification

`tests/browser.cjs` runs integration checks against an already running production preview at `http://127.0.0.1:4173`. Install Playwright in your development tooling, or set `PLAYWRIGHT_MODULE` to its module path. Set `CHROME_PATH` if using a system Chrome executable and `PREVIEW_URL` for a different preview address. Run `node tests/browser.cjs`.

Contact and assistant requests are intercepted during tests, so no messages are sent and no AI credits are used. Checks cover direct routes, metadata, skills/search, real static PDF bytes, backend download fallback, contact success, assistant failure/retry and a stream without a trailing newline, mobile overflow, and theme persistence.

## Analytics

The existing Vercel Analytics integration receives `project_demo_click`, `resume_download`, and `contact_success`. Event properties contain only project names and download source/version, never contact details or chat text. Confirm custom-event availability in the deployed project's analytics dashboard. Demo events fire only for enabled live links.

## Still needs owner content

Real demo recordings, screenshots from working project sites, and approved testimonials. The public site omits empty sections. No deployment or external publication was performed.

