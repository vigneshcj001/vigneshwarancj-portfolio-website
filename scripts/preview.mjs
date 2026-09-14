import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { securityHeaders } from './securityHeaders.mjs';
const root=path.resolve(import.meta.dirname, '../dist');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.xml':'application/xml','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 for(const [k,v] of Object.entries(securityHeaders))res.setHeader(k,v);
 // Vercel injects analytics at this path in production; serve a no-op locally so the console stays clean.
 if(pathname.startsWith('/_vercel/')){res.setHeader('Content-Type','text/javascript');res.end('');return;}
 let file=path.resolve(root,'.'+pathname);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file))file=path.join(root,'index.html');
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
 fs.createReadStream(file).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('Preview at http://127.0.0.1:4173'));
