import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {pages,layout,esc} from './site.mjs';

export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function build({origin=process.env.SITE_ORIGIN || 'https://boraden.com.tr',indexable=process.env.SITE_INDEXABLE==='1',out=path.join(root,'dist')}={}) {
  const parsed=new URL(origin);
  if(!['http:','https:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname!=='/') throw new Error('SITE_ORIGIN must be an HTTP(S) origin without a path or credentials.');
  origin=parsed.origin;
  // Only replace generated output in this checkout; never source or an arbitrary path.
  if(path.resolve(out)!==path.join(root,'dist')) throw new Error('Build output must be this checkout’s dist directory.');
  fs.rmSync(out,{recursive:true,force:true});
  fs.cpSync(path.join(root,'public'),out,{recursive:true});
  const all=pages();
  if(new Set(all.map(p=>p.path)).size!==all.length)throw new Error('Duplicate page path');
  for(const page of all) {
    const file=page.path==='/404/' ? path.join(out,'404.html') : path.join(out,page.path,'index.html');
    fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,layout(page,{origin,indexable}));
  }
  const urls=all.filter(p=>p.path!=='/404/');
  fs.writeFileSync(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(p=>`<url><loc>${esc(origin+p.path)}</loc></url>`).join('')}</urlset>`);
  fs.writeFileSync(path.join(out,'robots.txt'),`User-agent: *\n${indexable?'Allow: /':'Disallow: /'}\nSitemap: ${origin}/sitemap.xml\n`);
  fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({pages:all.length,indexable,origin})+'\n');
  console.log(`Built ${all.length} standalone pages (${indexable?'indexable production':'noindex preview'}).`);
  return {all,origin,indexable,out};
}
if(process.argv[1]===fileURLToPath(import.meta.url)) build();
