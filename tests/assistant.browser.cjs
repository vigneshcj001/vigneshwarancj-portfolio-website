const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => { localStorage.setItem('theme', 'light'); localStorage.setItem('language', 'en'); });
    const actions = [
      { type: 'navigate', target: 'projects.pocketpet', label: 'Open PocketPet case study', auto_execute: true },
      { type: 'walkthrough', target: 'projects.pocketpet', label: 'Explore PocketPet in 4 steps', data: { project: 'pocketpet', steps: ['PocketPet overview', "Problem and CJ's contribution", 'Components and data flow', 'Design decisions and delivered result'] } },
      { type: 'contact', target: 'contact.form', label: 'Review a contact draft with CJ', requires_confirmation: true, data: { topic: 'PocketPet approval controls' } },
    ];
    const followups = [
      'How do Rust, Tauri, and Chromium work together in PocketPet?',
      "What did CJ build across PocketPet's desktop app and download website?",
      'Which PocketPet features differ on Windows, macOS, and Linux?',
    ];
    const tools = [
      { name: 'search_portfolio', status: 'completed', summary: 'Read 3 sources: PocketPet, Technical skills, Junior Software Developer' },
      { name: 'get_project_details', status: 'completed', summary: 'Read PocketPet implementation, contribution, and limitations' },
      { name: 'navigate_to_section', status: 'completed', summary: 'Prepared link to PocketPet case study; opening happens in your browser' },
    ];
    let contactSubmissions = 0;
    await page.route('**/_vercel/**', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }));
    await page.route('**/api/**', async (route) => {
      const pathname = new URL(route.request().url()).pathname;
      if (pathname === '/api/contact') contactSubmissions += 1;
      if (pathname !== '/api/assistant/stream') {
        await route.fulfill({ status: pathname === '/api/proof' ? 503 : 202, contentType: 'application/json', body: '{}' });
        return;
      }
      const events = [
        { type: 'status', phase: 'reading', message: 'Reading PocketPet implementation, contribution, and limitations' },
        ...tools.map((tool) => ({ type: 'tool', ...tool })),
        { type: 'done', done: true, full: 'PocketPet pauses before sensitive browser actions and asks for human approval. Its Rust agent also applies secret-field refusal and spend limits. Approval detection is heuristic, so it does not guarantee every sensitive action will be caught.', sources: [{ title: 'PocketPet', kind: 'Project', url: '/projects/pocketpet' }], project: 'pocketpet', followups, actions, tools },
      ];
      await route.fulfill({ contentType: 'text/event-stream', body: events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join('') });
    });
    const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
    await page.goto(base);
    await page.getByRole('button', { name: "Ask CJ's AI" }).click();
    const panel = page.getByRole('region', { name: 'Portfolio assistant' });
    await panel.getByRole('textbox', { name: 'Message', exact: true }).fill('Show PocketPet and explain its approval controls');
    await panel.getByRole('button', { name: 'Send', exact: true }).click();
    await panel.getByText('Opened PocketPet case study', { exact: true }).waitFor();
    await page.waitForURL(/\/projects\/pocketpet$/);
    await panel.locator('.assistant-agent-trace li').filter({ hasText: tools[1].summary }).waitFor();
    assert.deepEqual(await panel.locator('.assistant-followups button').allTextContents(), followups);
    assert.doesNotMatch(await panel.locator('.assistant-agent-trace').innerText(), /search_portfolio|get_project_details|thinking|tool calling/i);
    fs.mkdirSync(path.resolve('tmp'), { recursive: true });
    await page.screenshot({ path: path.resolve('tmp/assistant-specific-desktop.png') });
    await panel.getByRole('button', { name: 'Explore PocketPet in 4 steps' }).click();
    const tour = page.getByRole('dialog', { name: 'Project walkthrough' });
    await tour.getByText('PocketPet overview', { exact: true }).waitFor();
    await tour.getByRole('button', { name: 'Next', exact: true }).click();
    await tour.getByText("Problem and CJ's contribution", { exact: true }).waitFor();
    await tour.getByRole('button', { name: 'Close walkthrough' }).click();
    await page.goto(base);
    await page.getByRole('heading', { name: /Useful software/ }).waitFor();
    await page.getByRole('button', { name: "Ask CJ's AI" }).click();
    await panel.locator('.assistant-agent-trace li').filter({ hasText: tools[1].summary }).waitFor();
    assert.equal(new URL(page.url()).pathname, '/', 'Saved conversations must not replay navigation');
    await panel.getByRole('button', { name: 'Review a contact draft with CJ' }).click();
    await page.locator('#message').waitFor();
    await page.waitForURL(/\/contact\?message=/);
    assert.match(await page.locator('#message').inputValue(), /PocketPet approval controls/);
    assert.equal(contactSubmissions, 0, 'Preparing a draft must not submit it');
    await page.getByRole('button', { name: "Ask CJ's AI" }).click();
    await panel.getByText(/Contact draft placed in the form/).waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: path.resolve('tmp/assistant-specific-mobile.png') });
    assert.deepEqual(errors, []);
    console.log('PASS: specific source summaries, project questions, verified navigation receipts, walkthrough, no replay on restore, and unsent contact draft.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
