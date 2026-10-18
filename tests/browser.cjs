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
 await page.route('**/api/translate',async route=>{const body=route.request().postDataJSON();route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({translations:body.texts.map(text=>`${body.language} ${text}`)})});});
 const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
 await page.goto(base); await page.getByRole('heading',{name:/Useful software/}).waitFor();
 await page.screenshot({path:path.resolve('homepage-desktop.png'),fullPage:true});
 await page.getByRole('button',{name:/Try Agentic AI/}).click();const introAssistant=page.getByRole('region',{name:'Portfolio assistant'});await introAssistant.waitFor();await introAssistant.getByText('Experience Agentic AI').waitFor();assert.equal(await introAssistant.locator('.assistant-starter-grid button').count(),6);await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.getByRole('link',{name:/View résumé/}).click(); await page.getByRole('heading',{name:'Resume',exact:true}).waitFor();
 await page.route('**/api/resume',route=>route.fulfill({status:503,body:'Unavailable'}));
 const downloadPromise=page.waitForEvent('download'); await page.getByRole('button',{name:'Download PDF'}).click(); const download=await downloadPromise;
 assert.equal(download.suggestedFilename(),'Vigneshwaran_CJ_Resume.pdf'); const downloaded=await download.path(); assert.equal(fs.readFileSync(downloaded).subarray(0,5).toString(),'%PDF-');
 await page.goto(base);
 await page.getByRole('link',{name:/Explore selected work/}).click();
 await page.getByRole('textbox',{name:'Search projects by name or technology'}).fill('FastAPI');
 assert.deepEqual(await page.locator('h2').allTextContents(),['AIORA','GlycanBench: a unified resource for working with glycans']);
 await page.goto(base+'/skills');await page.getByRole('link',{name:'React.js ↗',exact:true}).click();
 assert.match(page.url(),/q=React/); await page.getByRole('heading',{name:'Syncly',exact:true}).waitFor(); assert.ok((await page.locator('h2').count())>=3);
 for (const slug of ['aiora','pocketpet','syncly','glycanbench']) {
  const title={aiora:'AIORA',pocketpet:'PocketPet',syncly:'Syncly',glycanbench:'GlycanBench'}[slug]; await page.goto(base+'/projects/'+slug);await page.getByRole('heading',{name:title,exact:true}).waitFor();
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://vigneshwarancj-portfolio-website.vercel.app/projects/'+slug);
  const raw=await (await page.request.get(base+'/projects/'+slug)).text();assert.ok(raw.includes(`/images/sharing/${slug}.png`));
 }
 await page.goto(base+'/contact');await page.getByLabel('Full Name').fill('Browser test');await page.getByLabel('Email Address').fill('test@example.com');await page.getByLabel('Message',{exact:true}).fill('Test message, intercepted locally.');
 await page.route('**/api/contact',route=>route.fulfill({status:202,contentType:'application/json',body:'{"accepted":true}'}));
 await page.route('https://api.emailjs.com/**',route=>route.fulfill({status:200,body:'OK'}));
 await page.getByRole('button',{name:/Send Message/}).click();await page.getByRole('status').filter({hasText:'Message sent successfully'}).waitFor();
 await page.goto(base+'/contact?message=Prepared%20from%20portfolio%20chat');assert.equal(await page.getByLabel('Message',{exact:true}).inputValue(),'Prepared from portfolio chat');
 await page.goto(base+'/resume');const fallbackPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Download PDF'}).click();await fallbackPromise;await page.getByRole('status').filter({hasText:'Saved PDF download started'}).waitFor();
 await page.goto(base);await page.getByRole('button',{name:"Ask CJ's AI"}).click();
 await page.route('**/api/events',route=>route.fulfill({status:202,contentType:'application/json',body:'{"accepted":true}'}));
 await page.route('**/api/assistant/stream',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({detail:'Service unavailable'})}));
 await page.getByRole('textbox',{name:'Message',exact:true}).fill('What is Syncly?');await page.getByRole('button',{name:'Send',exact:true}).click();await page.getByRole('button',{name:'Retry question'}).waitFor();
 await page.route('**/api/assistant/stream',route=>route.fulfill({status:200,contentType:'text/event-stream',body:'data: {"type":"status","phase":"planning","message":"Reading Syncly matching and chat details"}\n\ndata: {"type":"tool","name":"search_portfolio","status":"completed","summary":"Read Syncly project details and matching workflow"}\n\ndata: {"type":"ui_action","action":{"type":"navigate","target":"projects.syncly","label":"Open Syncly project","auto_execute":false,"requires_confirmation":false,"data":{}}}\n\ndata: {"type":"token","text":"Syncly connects professionals."}\n\ndata: {"type":"done","done":true,"full":"Syncly connects professionals.","sources":[{"title":"Syncly project","kind":"Project","url":"/projects/syncly"}],"followups":["What did CJ build end to end in Syncly?"],"project":"syncly","tools":[{"name":"search_portfolio","status":"completed","summary":"Read Syncly project details and matching workflow"}],"actions":[{"type":"navigate","target":"projects.syncly","label":"Open Syncly project","auto_execute":false,"requires_confirmation":false,"data":{}}]}'}));
 await page.getByRole('button',{name:'Retry question'}).click();await page.getByText('Syncly connects professionals.',{exact:true}).waitFor();await page.getByRole('button',{name:'Copy',exact:true}).last().waitFor();
 const assistant=page.getByRole('region',{name:'Portfolio assistant'});await assistant.getByText('Related project').waitFor();await assistant.getByRole('link',{name:'Syncly project'}).waitFor();await assistant.getByText(/Read Syncly project details and matching workflow/).waitFor();await assistant.getByRole('button',{name:/Open Syncly project/}).click();await page.waitForURL(/\/projects\/syncly/);await page.locator('#case-study-syncly.agent-highlight').waitFor();await assistant.getByText('Opened Syncly project',{exact:true}).waitFor();assert.equal(await assistant.getByText('search portfolio',{exact:true}).count(),0);await assistant.getByRole('button',{name:'Helpful answer',exact:true}).click();assert.match(await assistant.getByRole('link',{name:/Prepare contact message/}).getAttribute('href'),/message=/);
 const transcriptPromise=page.waitForEvent('download');await assistant.getByRole('button',{name:'Download transcript'}).click();assert.equal((await transcriptPromise).suggestedFilename(),'vigneshwaran-portfolio-chat.txt');
 await page.route('**/api/assistant/stream',async route=>{await new Promise(resolve=>setTimeout(resolve,1500));await route.fulfill({status:200,contentType:'text/event-stream',body:'data: {"text":"Delayed response"}\n\ndata: {"done":true,"full":"Delayed response"}'});});
 await page.getByRole('textbox',{name:'Message',exact:true}).fill('Explain AIORA');await page.getByRole('button',{name:'Send',exact:true}).click();await page.getByRole('button',{name:'Stop response'}).click();await page.getByText('Response stopped.',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Clear chat'}).click();assert.equal(await page.getByText('Syncly connects professionals.',{exact:true}).count(),0);
 await assistant.getByRole('button',{name:'Conversation history'}).click();await assistant.getByRole('textbox',{name:'Search conversations'}).fill('Syncly');await assistant.getByText('What is Syncly?').waitFor();await assistant.getByRole('button',{name:/Larger text/}).click();await assistant.getByRole('button',{name:'Close history'}).click();assert.match(await assistant.getAttribute('class'),/assistant-text-large/);
 await page.getByRole('button',{name:'Close',exact:true}).click(); await page.getByRole('region',{name:'Portfolio assistant'}).waitFor({state:'detached'});
 await page.goto(base);await page.getByRole('button',{name:"Ask CJ's AI"}).click();const restoredAssistant=page.getByRole('region',{name:'Portfolio assistant'});assert.match(await restoredAssistant.getAttribute('class'),/assistant-text-large/);await restoredAssistant.getByRole('button',{name:'Conversation history'}).click();await restoredAssistant.getByRole('textbox',{name:'Search conversations'}).fill('Syncly');await restoredAssistant.getByText('What is Syncly?').waitFor();await restoredAssistant.getByRole('button',{name:'Close history'}).click();await restoredAssistant.getByRole('button',{name:'Close',exact:true}).click();const languageSelect=page.locator('#language-select-desktop');
 for(const code of ['ta','fr','zh-CN','hi','es','ar']) {await languageSelect.selectOption(code);assert.equal(await page.locator('html').getAttribute('lang'),code);assert.equal(await languageSelect.inputValue(),code);}
 assert.equal(await page.locator('html').getAttribute('dir'),'rtl');await page.getByRole('heading',{name:/برمجيات مفيدة/}).waitFor();
 await languageSelect.selectOption('ta');await page.getByRole('heading',{name:/பயனுள்ள மென்பொருள்/}).waitFor();await page.getByText(/ta I’m Vigneshwaran/).waitFor();
 await languageSelect.selectOption('en');await page.getByRole('heading',{name:/Useful software/}).waitFor();assert.equal(await page.locator('html').getAttribute('dir'),'ltr');
 for(const width of [320,390,768,1024]) {
  await page.setViewportSize({width,height:844});
  // Let responsive layout and animation transforms settle after resizing.
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow at ${width}`);
 }
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Toggle Menu'}).click();assert.equal(await page.getByRole('button',{name:'Toggle Menu'}).getAttribute('aria-expanded'),'true');
 await page.getByRole('button',{name:/Theme:/}).last().click();const dark=await page.evaluate(()=>document.documentElement.classList.contains('dark'));await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('button',{name:'Toggle Menu'}).getAttribute('aria-expanded'),'false');
 await page.reload();await page.getByRole('heading',{name:/Useful software/}).waitFor();assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('dark')),dark);
 await page.getByRole('button',{name:"Ask CJ's AI"}).click();await page.waitForTimeout(350);const mobilePanel=await page.getByRole('region',{name:'Portfolio assistant'}).boundingBox();assert.equal(Math.round(mobilePanel.x),0);assert.ok(mobilePanel.width>=389);await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.screenshot({path:path.resolve('homepage-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: LangGraph tool trace, allowlisted navigation/highlight, chat citations, project cards, feedback, transcript export, stop/retry, saved history, accessibility preferences, contact handoff, full-width mobile UI, seven languages, and portfolio regressions.');
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});

