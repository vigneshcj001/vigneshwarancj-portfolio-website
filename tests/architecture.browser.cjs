const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
    const errors = [];
    let assistantRequests = 0;
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => { localStorage.setItem('theme', 'light'); localStorage.setItem('language', 'en'); });
    await page.route('**/_vercel/**', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }));
    await page.route('**/api/**', (route) => {
      if (route.request().url().includes('/api/assistant')) assistantRequests += 1;
      return route.fulfill({ status: 503, contentType: 'application/json', body: '{}' });
    });
    const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
    await page.goto(`${base}/assistant-architecture`);
    await page.getByRole('heading', { name: /A question. A traceable path/ }).waitFor();
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://vigneshwarancj-portfolio-website.vercel.app/assistant-architecture');
    const stages = page.getByRole('list', { name: 'Request flow stages' });
    const detail = page.locator('#ai-stage-detail');
    assert.equal(await stages.getByRole('button').count(), 7);
    assert.equal(await page.getByRole('button', { name: 'Previous step', exact: true }).isDisabled(), true);
    await stages.getByRole('button').nth(2).focus();
    await page.keyboard.press('Enter');
    await detail.getByRole('heading', { name: 'Decide scope and portfolio topic' }).waitFor();
    await page.getByRole('button', { name: 'Next step', exact: true }).click();
    await detail.getByRole('heading', { name: 'Run a small, typed tool plan' }).waitFor();
    assert.match(await detail.innerText(), /explicit rules/);
    await page.getByText('Implementation reference', { exact: true }).click();
    await detail.getByText(/app\/agent\/graph.py/).waitFor();
    fs.mkdirSync(path.resolve('tmp'), { recursive: true });
    await page.locator('.ai-flow-explorer').screenshot({ path: path.resolve('tmp/architecture-desktop.png') });
    await page.getByRole('button', { name: 'Blocked request', exact: true }).click();
    assert.equal(await stages.getByRole('button').count(), 4);
    assert.equal(await stages.getByRole('button', { name: /Write answer/ }).count(), 0);
    await stages.getByRole('button').last().click();
    await detail.getByRole('heading', { name: 'Return a fixed reply' }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Next step', exact: true }).isDisabled(), true);
    await page.getByRole('button', { name: 'Laya unavailable', exact: true }).click();
    assert.equal(await stages.getByRole('button').count(), 7);
    await stages.getByRole('button').nth(2).click();
    await detail.getByRole('heading', { name: 'Continue with local routing' }).waitFor();
    await page.getByRole('button', { name: 'Contact draft', exact: true }).click();
    await stages.getByRole('button').last().click();
    await detail.getByRole('heading', { name: 'Validate the action, then confirm the result' }).waitFor();
    await page.getByRole('button', { name: 'Try this question', exact: true }).click();
    const assistant = page.getByRole('region', { name: 'Portfolio assistant' });
    assert.equal(await assistant.getByRole('textbox', { name: 'Message', exact: true }).inputValue(), 'Prepare a contact draft about an AI engineering role.');
    assert.equal(assistantRequests, 0, 'Exploring scenarios and prefilling a question must not call the assistant');
    await assistant.getByRole('link', { name: 'How this assistant works' }).click();
    await assistant.waitFor({ state: 'detached' });
    for (const width of [320, 390, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Architecture overflow at ${width}`);
    }
    await page.setViewportSize({ width: 390, height: 900 });
    await page.getByRole('button', { name: 'Project question', exact: true }).click();
    await stages.getByRole('button').nth(3).click();
    await page.locator('.ai-flow-explorer').screenshot({ path: path.resolve('tmp/architecture-mobile.png') });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.locator('.ai-flow-explorer').screenshot({ path: path.resolve('tmp/architecture-dark.png') });
    await page.goto(base);
    await page.getByRole('link', { name: 'Explore the AI architecture and request flow' }).click();
    await page.waitForURL(/\/assistant-architecture$/);
    assert.equal(assistantRequests, 0);
    assert.deepEqual(errors, []);
    console.log('PASS: architecture direct route, keyboard steps, refusal/fallback branches, contact prefill without submission, discoverability, and responsive layouts.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
