// Shared with the local preview server so the browser suite runs under the
// same headers Vercel applies in production (see vercel.json).
import fs from 'node:fs';
import path from 'node:path';
const cfg = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../vercel.json'), 'utf8'));
export const securityHeaders = Object.fromEntries(cfg.headers[0].headers.map(h => [h.key, h.value]));
