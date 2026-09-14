const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const dist=path.resolve(__dirname,'../dist');
test('production pages contain their own share metadata and resolvable assets',()=>{
 for(const slug of ['syncly','glycanbench']) {
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
 for(const route of ['projects/syncly','projects/glycanbench','writing/rest-and-real-time','writing/interpreting-research-models']) assert.ok(sitemap.includes(route));
});
