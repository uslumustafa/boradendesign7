import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build,root} from './src/build.mjs';
const dist=path.join(root,'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.svg':'image/svg+xml','.webp':'image/webp','.ttf':'font/ttf','.pdf':'application/pdf','.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'};
const headers={'X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-cache','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'"};
export const server=http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD',...headers});return res.end();}
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname.includes('\0'))throw new Error();}catch{res.writeHead(400,headers);return res.end('Bad request');}
  let file=path.resolve(dist,'.'+pathname);
  let status=200;
  if(!file.startsWith(dist+path.sep) && file!==dist || pathname.split('/').some(s=>s.startsWith('.'))){res.writeHead(403,headers);return res.end('Forbidden');}
  try {
    if(fs.statSync(file).isDirectory()) {
      if(!pathname.endsWith('/')){res.writeHead(308,{...headers,Location:pathname+'/'});return res.end();}
      file=path.join(file,'index.html');
    }
    if(!fs.statSync(file).isFile())throw new Error();
  }catch{status=404;file=path.join(dist,'404.html');}
  const stat=fs.statSync(file);
  res.writeHead(status,{...headers,'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Content-Length':stat.size});
  if(req.method==='HEAD')return res.end();
  const stream=fs.createReadStream(file);stream.on('error',()=>res.destroy());stream.pipe(res);
});
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  if(!fs.existsSync(path.join(dist,'index.html')))build();
  server.listen(Number(process.env.PORT || 4177),'127.0.0.1',()=>console.log('Boraden Design 7: http://127.0.0.1:'+ (process.env.PORT || 4177)));
}
