const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
 const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
 try {
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 const errors=[]; page.on('pageerror', error => errors.push(error.message));
 await page.route('**/_vercel/**', route => route.fulfill({contentType:'application/javascript',body:''}));
 const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
 await page.goto(base); await page.getByRole('heading',{name:/Useful software/}).waitFor();
 const downloadPromise=page.waitForEvent('download'); await page.getByRole('link',{name:/Download résumé/}).click(); const download=await downloadPromise;
 assert.equal(download.suggestedFilename(),'Vigneshwaran_CJ_Resume.pdf');
 const downloaded=await download.path(); assert.equal(fs.readFileSync(downloaded).subarray(0,5).toString(),'%PDF-');
 await page.getByRole('link',{name:'Explore my work →'}).click();
 await page.getByRole('textbox',{name:'Search projects by name or technology'}).fill('FastAPI');
 assert.deepEqual(await page.locator('h2').allTextContents(),['GlycanBench: integrated resource for working with glycans']);
 await page.goto(base+'/skills');await page.getByRole('link',{name:'React.js ↗',exact:true}).click();
 assert.match(page.url(),/q=React/); await page.getByRole('heading',{name:'Syncly',exact:true}).waitFor(); assert.ok((await page.locator('h2').count())>=3);
 for (const slug of ['syncly','glycanbench']) {
  await page.goto(base+'/projects/'+slug);await page.getByRole('heading',{name:slug==='syncly'?'Syncly':'GlycanBench',exact:true}).waitFor();
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://vigneshwarancj-portfolio-website.vercel.app/projects/'+slug);
  const raw=await (await page.request.get(base+'/projects/'+slug)).text();assert.ok(raw.includes(`/images/sharing/${slug}.png`));
 }
 await page.goto(base+'/contact');await page.getByLabel('Full Name').fill('Browser test');await page.getByLabel('Email Address').fill('test@example.com');await page.getByLabel('Message',{exact:true}).fill('Test message, intercepted locally.');
 await page.route('https://api.emailjs.com/**',route=>route.fulfill({status:200,body:'OK'}));
 await page.getByRole('button',{name:/Send Message/}).click();await page.getByRole('status').filter({hasText:'Message sent successfully'}).waitFor();
 await page.goto(base+'/resume');await page.route('**/api/resume',route=>route.fulfill({status:503,body:'Unavailable'}));
 const fallbackPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Download PDF'}).click();await fallbackPromise;await page.getByRole('status').filter({hasText:'saved PDF download has started'}).waitFor();
 await page.goto(base);await page.getByRole('button',{name:'Open AI Assistant'}).click();
 await page.route('**/api/assistant/stream',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({detail:'Service unavailable'})}));
 await page.getByRole('textbox',{name:'Message',exact:true}).fill('What is Syncly?');await page.getByRole('button',{name:'Send',exact:true}).click();await page.getByRole('button',{name:'Retry question'}).waitFor();
 await page.route('**/api/assistant/stream',route=>route.fulfill({status:200,contentType:'text/event-stream',body:'data: {"text":"Syncly connects professionals."}\n\ndata: {"done":true,"full":"Syncly connects professionals."}'}));
 await page.getByRole('button',{name:'Retry question'}).click();await page.getByText('Syncly connects professionals.',{exact:true}).waitFor();await page.getByRole('button',{name:'Copy',exact:true}).last().waitFor();
 await page.getByRole('button',{name:'Clear chat'}).click();assert.equal(await page.getByText('Syncly connects professionals.',{exact:true}).count(),0);
 await page.getByRole('button',{name:'Close',exact:true}).click(); await page.getByRole('region',{name:'Portfolio assistant'}).waitFor({state:'detached'});
 for(const width of [320,390,768,1024]) {
  await page.setViewportSize({width,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow at ${width}`);
 }
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Toggle Menu'}).click();assert.equal(await page.getByRole('button',{name:'Toggle Menu'}).getAttribute('aria-expanded'),'true');
 await page.getByRole('button',{name:'Toggle Theme'}).last().click();const dark=await page.evaluate(()=>document.documentElement.classList.contains('dark'));await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('button',{name:'Toggle Menu'}).getAttribute('aria-expanded'),'false');
 await page.reload();await page.getByRole('heading',{name:/Useful software/}).waitFor();assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('dark')),dark);
 await page.screenshot({path:path.resolve('homepage-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: navigation, search, skill evidence, metadata, PDF downloads, contact success (mocked), chat failure/retry/stream completion, mobile widths, theme persistence.');
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});



