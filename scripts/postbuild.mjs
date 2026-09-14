import fs from 'node:fs';
import path from 'node:path';
import { caseStudies, articles } from '../src/data/showcase.js';
const base = 'https://vigneshwarancj-portfolio-website.vercel.app';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
fs.copyFileSync(path.join(root,'resume.pdf'),path.join(dist,'resume.pdf'));
fs.copyFileSync(path.join(root,'images/image.jpeg'),path.join(dist,'og-image.jpg'));
fs.copyFileSync(path.join(root,'robots.txt'),path.join(dist,'robots.txt'));
fs.cpSync(path.join(root,'images/sharing'),path.join(dist,'images/sharing'),{recursive:true});
const template = fs.readFileSync(path.join(dist,'index.html'),'utf8');
const routes = Object.fromEntries(['about','experience','projects','publications','skills','social','contact','resume','writing'].map(route => [route,{title: route[0].toUpperCase()+route.slice(1),description:'Explore Vigneshwaran C. J.’s '+route+'.'}]));
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
fs.writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...Object.keys(routes)].map(route=>`<url><loc>${base}/${route}</loc></url>`).join('')}</urlset>`);
console.log(`Published static resume and sharing metadata for ${Object.keys(routes).length} routes.`);
