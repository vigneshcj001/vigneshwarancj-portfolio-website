import fs from 'node:fs';
import path from 'node:path';
import { caseStudies, articles } from '../src/data/showcase.js';
import { architectureMeta } from '../src/data/assistantArchitecture.js';
const base = 'https://vigneshwarancj-portfolio-website.vercel.app';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
fs.copyFileSync(path.join(root,'resume.pdf'),path.join(dist,'resume.pdf'));
fs.copyFileSync(path.join(root,'Vigneshwaran_CJ.docx'),path.join(dist,'Vigneshwaran_CJ.docx'));
if (fs.existsSync(path.join(root,'resume.txt'))) fs.copyFileSync(path.join(root,'resume.txt'),path.join(dist,'resume.txt'));
fs.copyFileSync(path.join(root,'images/image.jpeg'),path.join(dist,'og-image.jpg'));
fs.copyFileSync(path.join(root,'robots.txt'),path.join(dist,'robots.txt'));
fs.copyFileSync(path.join(root,'sw.js'),path.join(dist,'sw.js'));
fs.cpSync(path.join(root,'images/sharing'),path.join(dist,'images/sharing'),{recursive:true});
const template = fs.readFileSync(path.join(dist,'index.html'),'utf8');
const routes = Object.fromEntries(['about','experience','projects','publications','skills','social','contact','resume','writing'].map(route => [route,{title: route[0].toUpperCase()+route.slice(1),description:'Explore Vigneshwaran C. J.’s '+route+'.'}]));
routes['assistant-architecture'] = architectureMeta;
routes['match'] = {title:'Job description match',description:'Paste a job description to see which requirements Vigneshwaran C. J.’s documented work covers, with evidence links and honest gaps.'};
for (const [slug, study] of Object.entries(caseStudies)) routes[`projects/${slug}`]={title:`${study.title} — Case study`,description:study.summary,image:`/images/sharing/${slug}.png`};
for (const article of articles) routes[`writing/${article.slug}`]={title:article.title,description:article.intro};
for (const [route,meta] of Object.entries(routes)) {
 const title=escape(`${meta.title} | Vigneshwaran C.J.`), description=escape(meta.description), url=`${base}/${route}`, image=base+(meta.image || '/og-image.jpg');
 let html=template.replace(/<title>.*?<\/title>/,`<title>${title}</title>`);
 // Parcel minifies attribute quoting; replace complete tags by their identifying name/property.
 for (const [key,value] of Object.entries({'description':description,'og:title':title,'og:description':description,'og:url':url,'og:image':image,'twitter:title':title,'twitter:description':description,'twitter:image':image})) {
  const re=new RegExp(`<meta\\b[^>]*(?:name|property)=["']?${key}["'\\s][^>]*>`,'g');
  html=html.replace(re,`<meta ${key.startsWith('og:')?'property':'name'}="${key}" content="${value}">`);
 }
 html=html.replace(/<link\b[^>]*rel=["']?canonical["'\s][^>]*>/g,`<link rel="canonical" href="${url}">`);
 fs.mkdirSync(path.join(dist,route),{recursive:true}); fs.writeFileSync(path.join(dist,route,'index.html'),html);
}
// RSS 2.0 feed of technical notes, so readers and the newsletter have a real source.
const xml = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const feedItems = articles.map(article => {
 const link = `${base}/writing/${article.slug}`;
 const body = article.sections.map(([heading, text]) => `<h2>${xml(heading)}</h2><p>${xml(text)}</p>`).join('');
 return `<item><title>${xml(article.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid>`
  + `<category>${xml(article.project)}</category><description>${xml(article.intro)}</description>`
  + `<content:encoded><![CDATA[<p>${xml(article.intro)}</p>${body}]]></content:encoded></item>`;
}).join('');
fs.writeFileSync(path.join(dist,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>Vigneshwaran C. J. — Technical notes</title><link>${base}/writing</link><description>Engineering and research notes on full-stack systems, AI agents, and computational biology.</description><language>en</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate><atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>${feedItems}</channel></rss>`);
fs.writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...Object.keys(routes)].map(route=>`<url><loc>${base}/${route}</loc></url>`).join('')}</urlset>`);
console.log(`Published static resume and sharing metadata for ${Object.keys(routes).length} routes.`);
