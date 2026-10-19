const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const dist=path.resolve(__dirname,'../dist');
test('deployed direct links serve the generated sharing metadata',async()=>{
 const {caseStudies,articles}=await import('../src/data/showcase.js');
 const config=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../vercel.json'),'utf8'));
 const routes=['assistant-architecture',...Object.keys(caseStudies).map(slug=>`projects/${slug}`),...articles.map(article=>`writing/${article.slug}`)];
 for(const route of routes){
  const rewrite=config.rewrites.find(rule=>rule.source===`/${route}` || rule.source==='/(.*)');
  assert.equal(rewrite?.destination,`/${route}/index.html`,`Direct link loses metadata: ${route}`);
  assert.ok(fs.existsSync(path.join(dist,route,'index.html')));
 }
});
test('PocketPet application and download website are represented as one project',async()=>{
 const {projects}=await import('../src/data/projects.js');
 const pocketPet=projects.filter(project=>project.title.toLowerCase().includes('pocketpet'));
 assert.equal(pocketPet.length,1);
 assert.equal(pocketPet[0].github,'https://github.com/vigneshcj001/Pocketpet');
 assert.equal(pocketPet[0].githubWebsite,'https://github.com/vigneshcj001/Pocketpet-web');
 assert.equal(pocketPet[0].link,'https://pocketpet-web.vercel.app/');
});
test('GlycanBench uses the SASTRA deployment and public lab repository',async()=>{
 const {projects}=await import('../src/data/projects.js');
 const glycanBench=projects.find(project=>project.title.startsWith('GlycanBench'));
 assert.equal(glycanBench.link,'https://glycanbench.sastra.edu/');
 assert.equal(glycanBench.github,'https://github.com/APalaniaLab/GlycanBench');
});
test('production pages contain their own share metadata and resolvable assets',()=>{
 for(const slug of ['aiora','syncly','glycanbench','pocketpet']) {
  const html=fs.readFileSync(path.join(dist,'projects',slug,'index.html'),'utf8');
  assert.ok(html.includes(`https://vigneshwarancj-portfolio-website.vercel.app/projects/${slug}`));
  assert.ok(html.includes(`/images/sharing/${slug}.png`));
  assert.equal((html.match(/property="og:title"/g)||[]).length,1);
  const map=html.match(/<script type=importmap>(.*?)<\/script>/)?.[1];assert.ok(map);
  for(const asset of Object.values(JSON.parse(map).imports)) assert.ok(fs.existsSync(path.join(dist,decodeURIComponent(asset))),`Missing ${asset}`);
 }
});
test('the saved download is a PDF and the new routes appear in the sitemap',()=>{
 assert.equal(fs.readFileSync(path.join(dist,'resume.pdf')).subarray(0,5).toString(),'%PDF-');
 const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
 for(const route of ['assistant-architecture','projects/aiora','projects/syncly','projects/glycanbench','projects/pocketpet','writing/aiora-routing','writing/pocketpet-safety','writing/glycanbench-mpnn']) assert.ok(sitemap.includes(route));
});

test('architecture direct link contains the dedicated title and description',async()=>{
 const {architectureMeta}=await import('../src/data/assistantArchitecture.js');
 const html=fs.readFileSync(path.join(dist,'assistant-architecture/index.html'),'utf8');
 assert.ok(html.includes(architectureMeta.title));
 assert.ok(html.includes(architectureMeta.description));
 assert.ok(html.includes('https://vigneshwarancj-portfolio-website.vercel.app/assistant-architecture'));
});
test('portfolio UI identifies the assistant architecture',()=>{
 const source=fs.readFileSync(path.resolve(__dirname,'../src/pages/Home.js'),'utf8');
 for(const technology of ['OKF','Laya','Groq']) assert.ok(source.includes(technology));
});
