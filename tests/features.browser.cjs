const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

// Job match (tailored résumé, share links), compare, recruiter brief, status,
// recommendations, skills proof map, 404 search, and contact quick actions.
// Every API call is mocked, so nothing is stored and no AI credits are used.
const MATCH = {
  summary: 'Strong full-stack AI fit with FastAPI and React evidence; Kafka is a gap.',
  requirements: [
    { requirement: 'FastAPI services', status: 'strong', evidence: 'Bullion Handler and GlycanBench use FastAPI.' },
    { requirement: 'Kafka', status: 'gap', evidence: 'No documented Kafka work.' },
  ],
  keywords: { matched: [{ term: 'FastAPI', evidence: [{ kind: 'project', title: 'GlycanBench', url: '/projects/glycanbench' }] }], missing: ['Kafka'], coverage: 0.5 },
  sources: [{ title: 'GlycanBench', path: 'projects/glycanbench.md', url: '/projects/glycanbench' }],
  generated_by: 'groq',
};

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce', acceptDownloads: true });
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    const page = await context.newPage();
    const errors = [];
    const calls = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => { localStorage.setItem('theme', 'light'); localStorage.setItem('language', 'en'); });
    await page.route('**/_vercel/**', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }));
    await page.route('**/api/**', async (route) => {
      const request = route.request();
      const { pathname } = new URL(request.url());
      calls.push(`${request.method()} ${pathname}`);
      if (pathname === '/api/match') return route.fulfill({ contentType: 'application/json', body: JSON.stringify(MATCH) });
      if (pathname === '/api/resume/tailored') {
        const body = request.postDataJSON();
        assert.ok(body.job_description.length >= 80, 'tailoring receives the analysed job description');
        return route.fulfill({ contentType: 'application/pdf', headers: { 'Content-Disposition': 'attachment; filename="Vigneshwaran_CJ_Resume_tailored.pdf"', 'Access-Control-Expose-Headers': 'Content-Disposition' }, body: '%PDF-1.4 tailored' });
      }
      if (pathname === '/api/match/share' && request.method() === 'POST') {
        const body = request.postDataJSON();
        assert.equal(body.job_description, undefined, 'the job description is never sent for sharing');
        return route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 'abcDEF123456', expires_in_days: 30 }) });
      }
      if (pathname === '/api/match/share/abcDEF123456') return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ ...MATCH, title: 'AI Engineer at Acme' }) });
      if (pathname === '/api/health') return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ status: 'ok', version: 'test123', uptime_seconds: 7200, database: 'connected', assistant: { router: 'laya' } }) });
      if (pathname === '/api/testimonials' && request.method() === 'POST') return route.fulfill({ status: 202, contentType: 'application/json', body: '{"accepted":true}' });
      if (pathname === '/api/testimonials') return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ testimonials: [{ name: 'Test Lead', role: 'Engineering Manager', relationship: 'Managed CJ', quote: 'Ships carefully tested work and explains trade-offs clearly.' }] }) });
      return route.fulfill({ status: 202, contentType: 'application/json', body: '{}' });
    });
    const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
    fs.mkdirSync(path.resolve('tmp'), { recursive: true });

    // Job match → tailored résumé → share link → shared view.
    await page.goto(`${base}/match`);
    await page.getByRole('button', { name: 'Use a sample' }).click();
    await page.getByRole('button', { name: 'Analyze fit' }).click();
    await page.getByRole('heading', { name: MATCH.summary }).waitFor();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Tailored résumé (PDF)' }).click();
    assert.equal((await downloadPromise).suggestedFilename(), 'Vigneshwaran_CJ_Resume_tailored.pdf');
    await page.getByRole('textbox', { name: /Role name/ }).fill('AI Engineer at Acme');
    await page.getByRole('button', { name: 'Share this result' }).click();
    await page.getByRole('link', { name: /\/match\/abcDEF123456$/ }).waitFor();
    await page.screenshot({ path: path.resolve('tmp/match-desktop.png'), fullPage: true });
    await page.goto(`${base}/match/abcDEF123456`);
    await page.getByText('Assessment · AI Engineer at Acme').waitFor();
    assert.equal(await page.getByRole('button', { name: 'Share this result' }).count(), 0, 'shared view is read-only');

    // New case studies and the GlycanBench evaluation / state-of-the-art sections.
    await page.goto(`${base}/projects/kural`);
    await page.getByRole('heading', { name: 'Kural', level: 1 }).waitFor();
    await page.getByText('0.85 s').first().waitFor();
    await page.getByText(/Status: in development/).waitFor();
    await page.goto(`${base}/projects/cmo-copilot`);
    await page.getByRole('heading', { name: 'CMO Copilot', level: 1 }).waitFor();
    await page.getByText(/Team project at Ceiyone Tech Works/).waitFor();
    await page.goto(`${base}/projects/glycanbench`);
    await page.getByRole('heading', { name: 'Model evaluation' }).waitFor();
    await page.getByText(/633 glycans/).first().waitFor();
    await page.getByRole('heading', { name: 'What it adds over existing tools' }).waitFor();
    assert.equal(await page.locator('.sota-table tbody tr').count(), 7);
    await page.goto(`${base}/experience`);
    await page.getByRole('link', { name: 'Read the Kural case study →' }).first().waitFor();

    // Compare two projects via URL state.
    await page.goto(`${base}/compare?a=syncly&b=glycanbench`);
    await page.getByRole('columnheader', { name: 'Syncly' }).waitFor();
    await page.getByRole('combobox', { name: 'Second project' }).selectOption('pocketpet');
    await page.waitForURL(/b=pocketpet/);
    await page.getByRole('columnheader', { name: 'PocketPet' }).waitFor();

    // Recruiter brief, prepared for a company.
    await page.goto(`${base}/brief?for=Acme`);
    await page.getByText('Prepared for Acme').waitFor();
    await page.getByRole('heading', { name: /Now: Junior Software Developer/ }).waitFor();

    // Status reads the live health endpoint.
    await page.goto(`${base}/status`);
    await page.getByRole('status').filter({ hasText: 'Operational' }).waitFor();
    await page.getByText('test123').waitFor();

    // Recommendation form requires consent and shows the moderation notice.
    await page.goto(`${base}/recommend`);
    await page.getByLabel('Your name').fill('Test Person');
    await page.getByLabel('Your role and organisation').fill('Engineer, Example Co');
    await page.getByLabel('How you worked together').fill('Teammate');
    await page.getByLabel('Recommendation', { exact: true }).fill('Reliable engineer who writes clear documentation and tests.');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Send recommendation' }).click();
    await page.getByText(/will appear after Vigneshwaran reviews it/).waitFor();

    // Approved testimonials appear on the home page.
    await page.goto(base);
    await page.getByRole('heading', { name: 'From people who worked with him.' }).waitFor();

    // Skills proof map lists evidence for a chosen technology.
    await page.goto(`${base}/skills`);
    await page.getByRole('searchbox', { name: 'Filter technologies' }).fill('FastAPI');
    await page.getByRole('button', { name: /^FastAPI, \d+ places?$/ }).click();
    await page.getByRole('heading', { name: /FastAPI \d+ places?/ }).waitFor();

    // "/" focuses project search; 404 suggests the intended page.
    await page.goto(`${base}/projects`);
    // The page is lazy-loaded; wait until its search box exists before pressing "/".
    await page.getByRole('textbox', { name: 'Search projects by name or technology' }).waitFor();
    await page.keyboard.press('/');
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'project-search');
    await page.goto(`${base}/project/aiora`);
    await page.getByRole('link', { name: 'Aiora case study' }).waitFor();

    // Contact quick actions.
    await page.goto(`${base}/contact`);
    await page.getByRole('button', { name: 'Copy email address' }).click();
    await page.getByRole('button', { name: 'Email copied' }).waitFor();

    // No horizontal overflow on the new pages at phone and tablet widths.
    for (const route of ['/match', '/compare', '/brief', '/status', '/recommend', '/skills', '/projects/kural', '/projects/glycanbench']) {
      for (const width of [320, 390, 768]) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(`${base}${route}`);
        // Pages are lazy-loaded: measure only after the page's own heading renders.
        await page.locator('main h1').first().waitFor();
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow on ${route} at ${width}px`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/compare`);
    await page.screenshot({ path: path.resolve('tmp/compare-mobile.png'), fullPage: true });

    assert.ok(calls.includes('POST /api/resume/tailored') && calls.includes('POST /api/match/share'));
    assert.deepEqual(errors, []);
    console.log('PASS: job match tailoring and sharing, shared view, compare, recruiter brief, status, moderated recommendations, testimonials, skills proof map, keyboard search, 404 suggestions, copy email, and responsive layouts.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
