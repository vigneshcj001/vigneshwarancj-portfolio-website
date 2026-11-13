# Full-stack portfolio codebase

Source review updated: 12 November 2026. This document describes the first-party application source, content, tests, build scripts, and deployment configuration across the two sibling repositories. Dependencies, Git internals, build caches, historical copies, binary media, and secret environment values are outside the source review.

## Workspace and runtime

`vigneshwarancj-portfolio-website` is a React 19 SPA built with Parcel, Tailwind CSS 4, React Router, Framer Motion, React Icons, and Lucide. Vercel serves its generated assets and route-specific HTML metadata.

`vigneshwarancj_portfolio_backend` is a FastAPI application. It provides assistant generation, job-description matching, translation, ATS résumé generation (PDF/DOCX/TXT), public metadata, simulated demos, contact/subscriber storage, analytics and a conversion funnel, and protected administrative endpoints. Its AI design is reviewed against a standard rubric in `AI_SYSTEM_DESIGN.md`. PostgreSQL is optional for startup; Groq credentials are required by configuration imports.

The root `preview-server.mjs` is a separate legacy preview utility. Use the frontend's `scripts/preview.mjs` for checks because it applies the configured production security headers.

## Frontend source map

- `App.js`: browser routing, lazy page imports, page transitions, error boundary, language provider, shared shell, service-worker registration, and Vercel Analytics.
- `index.html`: application mount, baseline metadata, JSON-LD, icons, and manifest references.
- `index.css`: Tailwind setup, theme tokens, accessibility rules, portfolio layouts, assistant styles, responsive and print rules. `src/styles/assistantArchitecture.css` styles the architecture explorer; `src/styles/features.css` styles job match, project Q&A, stack filters, the résumé timeline, API status, and the admin funnel.
- `src/pages/Home.js`: hero, featured case studies, career preview, public proof, technical notes, assistant entry points, and architecture link.
- `About.js`, `Experience.js`, `Skills.js`, `Social.js`, and `Publications.js`: profile/education/certifications, expandable career cards, technology evidence links, social links, and filterable research records.
- `Project.js`: search, category, and stack filters held in the query string (`q`, `cat`, `tech`), copy-link and reset, project metadata, and source/demo links. `CaseStudy.js`: architecture, contribution, decisions, evidence, optional media, walkthrough anchors, safe demo components, an "Ask about this project" panel that opens the assistant, and a `case_study_view` event.
- `JobMatch.js`: `/match` route. Job-description input with a session-only draft, `POST /api/match`, coverage meter, requirement checklist, evidence links, gaps, sources, and a contact handoff. Only a coverage bucket and engine name reach analytics.
- `Writing.js`: technical-note index and individual article routes, driven by `src/data/showcase.js`.
- `Resume.js`: HTML résumé using generated canonical content; ATS PDF, DOCX, and TXT downloads from the backend with static fallbacks from the same generator; the `ResumeTimeline` role-to-stack explorer; and a single-column print view.
- `ContactUs.js`: React Hook Form validation, honeypot, query-string draft prefill, EmailJS delivery through `useContactForm`, and optional backend persistence.
- `Admin.js`: tab-local admin key, JSON revision editor, aggregate event view, conversion funnel (`AdminFunnel`), and link checking. Public pages do not consume saved admin revisions.
- `AssistantArchitecture.js`: public `/assistant-architecture` route with selectable request scenarios, seven-stage normal flow, four-stage refusal path, source references, memory boundaries, and all nine tools. The explorer is static explanatory content; selecting stages does not call providers. Trying a question fills the chat composer without sending it.

### Components

- `Header`, `NavBar`, `Footer`, `BackToTop`, `CommandPalette`, `ErrorBoundary`, and `ui/PageHeader` supply navigation, theme/language selection, search, recovery, and shared page presentation.
- `PortfolioAssistant` renders conversations, specific operation summaries, citations, project cards, recommendations, action receipts, walkthroughs, voice input, transcript export, feedback, local conversation management, and the live API status on its launcher.
- `ArchitectureDiagram` and `ProjectPreview` render case-study system maps and workflow previews. `CareerTimeline` merges career/education/research entries. `ResumeTimeline` lets visitors select a role and see its technologies highlighted. `LiveProof` reads public metadata with loading, unavailable, and GitHub-link states.
- `ApiPlayground` calls simulated backend project flows with inline errors. `PocketPetDemo` is a local companion/approval demonstration. `Newsletter` stores a subscription via the API and points to the RSS feed. `AdminFunnel` charts funnel totals with a table view.

### Assistant client and shared hooks

- `features/assistant/useAssistantChat.js`: request history, browser sessions, usage counter, stop/retry/timeout behavior, SSE updates, and completed answer metadata.
- `features/assistant/stream.js`: line-buffered parsing of `status`, `tool`, `ui_action`, text-token, final, and error events. Final metadata supplies actions to the UI.
- `features/assistant/actions.js`: fixed target-to-route/selector map, action validation, delayed destination lookup, navigation/highlight execution, and actual outcome reporting. Arbitrary selectors, URLs, and generated code are not accepted.
- `features/assistant/storage.js`: up to 12 browser conversations, unguessable `crypto.randomUUID()` conversation IDs (older IDs re-keyed on load), active conversation ID, daily usage storage, and restored messages marked so actions do not replay. `constants.js`: initial message and starter questions.
- `services/portfolioApi.js` and `config/runtime.js`: 45-second request timeouts, readable messages for network, timeout, 429, and 5xx errors, API methods (including job match, health, résumé formats, and best-effort session deletion), streaming request, and build-time API base selection.
- `Hooks/useApiStatus.js`: one shared `/api/health` probe after first paint that wakes the free-tier API and reports checking, waking, online, or offline.
- `Contexts/LanguageContext.js`, `i18n/messages.js`, and `Hooks/usePageTranslation.js`: seven language choices, static core translations, batched API translation, DOM observation, translation caches, and Arabic RTL.
- `Hooks/useMeta.js`: client title, description, canonical, and sharing metadata. `Hooks/useContactForm.js`: honeypot, best-effort persistence, EmailJS delivery, notification state, and conversion event.
- `Utils/analytics.js`: Vercel and first-party conversion events. `Utils/const.js`: public social and EmailJS identifiers. `Utils/motionFeatures.js`: lazy animation features.

### Content and assets

`src/data/portfolio.generated.js` is compiled from backend structured Markdown and powers the résumé. `projects.js`, `experience.js`, `education.js`, `skills.js`, `publications.js`, `social.js`, and `showcase.js` still contain separate presentation data; not every page is driven by the generated snapshot. Update both sources where appropriate and check for drift.

`src/data/assistantArchitecture.js` holds architecture descriptions, scenario-specific paths, example questions, and the displayed tool directory. Keep it synchronized with the backend graph/tool registry and client action interpreter.

`src/assets`, `images`, icons, and `pdfs` contain public media. `resume.pdf`, `Vigneshwaran_CJ.docx`, and `resume.txt` are committed fallback downloads exported from the backend's ATS generator. `manifest.webmanifest`, `robots.txt`, and `sw.js` provide PWA/search/offline behavior. The service worker uses network-first same-origin GET caching and excludes API requests; offline fallback can serve the root page when no request-specific entry exists.

## Backend source map

- `main.py`: FastAPI creation with a lifespan handler (knowledge validation, storage start and retention purge), CORS, request-ID/size/security middleware, `{"detail"}`-shaped 429 and 500 handlers, and route inclusion. API docs and OpenAPI endpoints are disabled.
- `app/config.py`: shared workspace `.env` loading, required Groq key, model and temperature, optional Laya/PostgreSQL/admin/tracing configuration, origins, proxy trust, cache and retention windows, and request/history limits.
- `app/models.py`, `schemas/platform.py`, and `schemas/translation.py`: typed payloads, message/history budgets, session format, analytics property restrictions, and translation limits.
- `app/content.py`: safe indexed Markdown loading, YAML parsing, schema/type validation, canonical portfolio compilation, and searchable text.
- `app/agent/graph.py`: fixed LangGraph `route → plan → execute` graph, rule-based planner, four-call budget, project follow-up context, streamed operation events, and final `AgentTurn`.
- `app/agent/tools.py`: nine Pydantic-validated tools; five read portfolio facts and four prepare browser actions. `protocol.py` defines action targets and trace schema. `memory.py` manages bounded session history and PostgreSQL/process-memory fallback.
- `app/ai/laya.py`: local prompt-extraction checks, optional Laya scope/topic request, validation, and local topic fallback. `okf.py`: lexical ranking with a small query-expansion vocabulary, public citation URLs, and the knowledge hash used for cache invalidation. No embeddings or vector database are used; `evals/retrieval_eval.py` measures recall@4 (0.958) and gates it in tests.
- `app/ai/chain.py`: grounded answer prompt, Groq model from `GROQ_MODEL`, temperature from `ANSWER_TEMPERATURE`, LangChain history, output parser, and streaming generation. `sanitizer.py` removes Markdown tokens/list markers from final text. `presentation.py` supplies localized fixed replies, specific progress text, and curated contextual questions.
- `app/ai/orchestrator.py`: older `PreparedTurn` retrieval helper retained for compatibility/tests; current assistant routes use the graph.
- `app/routes/assistant.py`: health root, JSON and SSE assistant endpoints, bounded restored history, opening-question answer cache (memory plus PostgreSQL, keyed by knowledge hash), generation timeout, persistence, session deletion, and final event packaging.
- `app/routes/resume.py` and `services/resume_document.py`: one ATS content model (single column, standard headings, contact in body, bullets per deliverable) rendered to PDF (FPDF2), DOCX (hand-built OOXML), and TXT. `scripts/export_resume.py` writes the frontend's static copies.
- `app/routes/platform.py`: detailed health (database ping, uptime, version), public proof, simulated demos, job match, events, contact/subscription persistence, protected revision/analytics/funnel/link checks, and generated SVG sharing cards.
- `app/services/match.py`: job-description analysis. A deterministic keyword layer finds evidence and gaps; a temperature-0.1 Groq assessment returns schema-validated JSON; keyword-only fallback.
- `app/routes/translation.py` and `services/translation.py`: ordered translation validation, Groq JSON generation, batching/cache support, and API error mapping.
- `app/services/storage.py`: asyncpg pool, six tables (including `portfolio_answer_cache`), SQL persistence, decoded JSONB retrieval, analytics and funnel aggregation, session deletion, and the startup retention purge. `proof.py`: single-flight cached GitHub/PyPI metadata with failure backoff, and bounded link checks with a GET fallback. `demos.py`: deterministic simulations without real purchases, employer calls, or scientific inference.
- `app/middleware.py` and `limiter.py`: request IDs and access logging, request body bounds, security headers, and SlowAPI limits keyed on the real client IP behind trusted proxies (`TRUSTED_PROXY_COUNT`).
- `knowledge/index.md`: 25 committed documents: profile, two education records, two certifications, research interests, four publications, skills, ten independent projects, and four experience records. AIORA facts are documented inside the Ceiyone experience record rather than a standalone project file.

## AI request and action flow

1. The browser sends a question, language, transcript, and session ID to `POST /api/assistant/stream`.
2. Validation and restored-history limits run. Server memory takes precedence over client history when present. An opening question with a cached answer returns immediately (still saved to the session).
3. Local prompt checks run; configured Laya classifies scope/topic before the LangGraph graph starts. The graph's route node consumes that decision rather than calling Laya itself.
4. The planner uses rules to choose typed tools, optionally resolving a project from preceding user turns. It is not an autonomous LLM tool-selection loop.
5. OKF retrieval reads committed Markdown. Tool execution emits specific `status` and `tool` summaries. Prepared `ui_action` events follow the graph.
6. Rejected scopes produce fixed replies with no retrieval/generation/actions. Otherwise Groq streams tokens grounded in the returned context.
7. The API cleans the full answer, saves the completed exchange, and emits `done` with citations, recommendations, project, traces, and actions.
8. The client replaces partial text with final text and interprets permitted actions. Navigation/highlights can run automatically; walkthrough/contact buttons require interaction. Success receipts follow a destination lookup. A contact draft does not submit the form.

The interactive UI presents this flow at `/assistant-architecture`. Backend details and SSE examples are maintained in `ASSISTANT_ARCHITECTURE.md` in the backend repository.

## Other end-to-end flows

- Content: indexed Markdown → Python canonical objects → retrieval/PDF; frontend prebuild → generated JavaScript → HTML résumé. Standalone frontend builds use the committed snapshot if the sibling knowledge directory is missing.
- Contact: form validation → optional API database save → EmailJS send. These are separate operations; database success does not prove email delivery.
- Newsletter: API stores an email with deduplication. No mailing/scheduled dispatch implementation is present; `postbuild.mjs` publishes technical notes as `/feed.xml` (RSS 2.0), linked from `<head>`, the footer, and the subscribe confirmation.
- Job match (`/match`): pasted description → `POST /api/match` → keyword evidence with links, gaps, and an optional AI requirement assessment. Only a coverage bucket and engine name are sent to analytics.
- Résumé downloads: PDF/DOCX/TXT come from the backend's ATS generator; the committed `resume.pdf`, `Vigneshwaran_CJ.docx`, and `resume.txt` fallbacks are exported from the same generator (`npm run resume:pdf` or the backend's `scripts/export_resume.py`). The two-column page is for on-screen reading; printing it is single-column.
- Funnel: `page_view` (path only) and `case_study_view` (slug) are first-party events; the admin page charts them with résumé, job match, and contact events.
- Demos: user input → rate-limited API → deterministic simulation result, explicitly labeled as a simulation.
- Public proof: cached GitHub/PyPI metadata → cards, with a link fallback when unavailable.
- Admin: key header → protected endpoints → PostgreSQL revisions/aggregates. Saving a revision does not rebuild knowledge or publish website content.
- Translation: static core strings first → cache → ordered Groq translation batches → DOM updates. The original English text can be restored.

## Build, deployment, and verification

Frontend commands:

```powershell
npm ci
npm run build
npm test
npm run preview
# In another terminal, with preview running:
npm run test:browser
```

`scripts/sync-portfolio-data.mjs` validates and compiles content before the build. Parcel creates bundled assets. `postbuild.mjs` copies existing public downloads/images and generates route-specific HTML metadata, a sitemap, and the `/feed.xml` RSS feed; it does not server-render page content or create new sharing images. `vercel.json` maps direct routes to those files and defines CSP/security/cache headers. `scripts/securityHeaders.mjs` reuses those headers in the preview server. CI installs Node 22, builds, runs Node tests, installs Chromium, starts preview, and runs browser checks.

`scripts/generate-resume.cjs` (`npm run resume:pdf`) downloads the ATS PDF, DOCX, and TXT from the backend (`RESUME_API_URL` selects a local one) and validates each file before saving. It no longer prints the two-column web page, whose letter-spaced headings and columns parsers misread.

Backend commands, from the backend repository:

```powershell
python -m pip install -r requirements.txt
node scripts/check_okf.mjs
python -m unittest discover -s tests -v
python -m evals.retrieval_eval
uvicorn main:app --reload --port 8080
```

Set `GROQ_API_KEY` server-side. Laya, PostgreSQL, admin, and LangSmith are optional integrations. `PORTFOLIO_API_URL` is a frontend build-time variable; the production CSP must also allow any changed backend origin. The Dockerfile uses Python 3.11, starts Uvicorn on port 8000, and runs as a non-root user. Dockerignore explicitly includes knowledge Markdown.

Node tests cover production metadata/assets (including `/match` and the RSS feed) and client action outcomes. Browser suites cover portfolio regressions, assistant UI/action receipts, saved-chat behavior, and the architecture explorer. Backend unit tests cover routing, a retrieval-quality gate (recall@4 and MRR), schema limits, sessions/JSON storage and erasure, answer-cache keys, history budget, stream presentation, job-match precision and parsing, résumé rendering, rate-limit keys, and demo behavior. Provider responses and contact sends are mocked in UI checks; these tests do not verify production credentials, live model quality, delivery, database connectivity, or Docker image execution.

## Current implementation boundaries

- Local prompt checks are heuristic. Without Laya, unrelated requests are not independently classified as unrelated; generation still has portfolio-only instructions.
- Session IDs partition history but do not authenticate users. Browser and process storage are bounded, and process fallback is not durable across restarts or shared across workers.
- Follow-up suggestions are curated English templates, selected by topic/project/aspect, with exact previously asked strings filtered. Page translation can localize displayed strings.
- Clear chat and Delete conversation also call `DELETE /api/assistant/session/{id}` (best effort). Conversation IDs come from `crypto.randomUUID()`. Older timestamp-based IDs were guessable; the browser re-keys them on load and erases the server copy stored under the old ID. PostgreSQL sessions idle longer than `SESSION_RETENTION_DAYS` (default 30) are purged at backend startup.
- Rate limiting uses process-local state. The opening-question answer cache is shared through PostgreSQL when configured. Browser usage display is a separate convenience counter from server IP limits.
- Static presentation data can differ from canonical Markdown; frontend project count includes the employer AIORA case study in addition to the ten canonical independent projects.
- Optional media and testimonial sections remain empty until real content is provided. Syncly's live link is disabled by presentation configuration; no live-site availability claim is made by this review.
- `RTK.md`, referenced by the supplied workspace instruction, was not present in the workspace or checked parent locations.
