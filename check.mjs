import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import {server} from './server.mjs';
import {build,root} from './src/build.mjs';
import {content,archive,publications,dateTR} from './src/content.mjs';
import {normalizeSearch,matchesSearch,sceneState} from './public/ui-core.js';
import {vehicleSchedule} from './public/vehicle-core.js';

test('complete standalone pages, links, metadata and factual schema',()=>{
  const {all,out}=build();
  assert.equal(content.services.length,47);
  assert.equal(content.groups.length,6);
  assert.equal(archive.length,247);
  assert.equal(dateTR(null),'Tarih belirtilmemiştir.');
  assert.equal(dateTR('bad-date'),'Tarih belirtilmemiştir.');
  assert.equal(new Set(all.map(p=>p.path)).size,all.length);
  for(const page of all) {
    const file=path.join(out,page.path==='/404/'?'404.html':page.path+'index.html');
    const html=fs.readFileSync(file,'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,page.path+' h1');
    assert.match(html,/<html lang="tr">/);
    assert.match(html,/<meta name="description" content="[^"]+">/);
    assert.match(html,/<link rel="canonical" href="https:\/\/boraden.com.tr\/[^\"]*">/);
    assert.match(html,/<meta name="robots" content="noindex,nofollow">/);
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema['@graph'][0].legalName,content.about.name);
    assert.ok(schema['@graph'].some(n=>n['@type']==='WebSite'));
    if(page.service)assert.ok(schema['@graph'].some(n=>n['@type']==='Service'));
    if(page.post?.publicationDateVerified===false)assert.equal(schema['@graph'].find(n=>n['@type']==='Article').datePublished,undefined);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
    assert.equal(new Set(ids).size,ids.length,page.path+' duplicate IDs');
    for(const [,url] of html.matchAll(/(?:href|src)="([^\"]+)"/g)) {
      assert.match(url,/^(?:\/(?!\/)|#|https?:\/\/|mailto:|tel:)/,page.path+' unsafe URL');
      if(url.startsWith('#')){assert.ok(ids.includes(url.slice(1)),page.path+' '+url);continue;}
      if(!url.startsWith('/') || url.startsWith('//'))continue;
      const local=url.split(/[?#]/)[0];
      const target=path.join(out,local,local.endsWith('/')?'index.html':'');
      assert.ok(fs.existsSync(target),page.path+' missing '+url);
      if(url.includes('#') && !local.endsWith('.pdf')) {
        const destination=fs.readFileSync(target,'utf8');
        assert.ok(destination.includes('id="'+url.split('#')[1]+'"'),page.path+' fragment '+url);
      }
    }
    assert.doesNotMatch(html,/(?:href|src)="[^\"]*(?:thinkers|ekibimiz|perspektifler\/|people\.mp4)/);
    assert.doesNotMatch(html,/datetime="(?:null|undefined)"|1 Ocak 1970/);
    // Catch exact adjacent word duplication in editorial prose, excluding navigation and structural labels.
    for(const [,text] of html.matchAll(/<(?:p|h[1-3])(?: [^>]*)?>(.*?)<\/(?:p|h[1-3])>/gs)) {
      const plain=text.replace(/<[^>]+>/g,' ').replace(/&[^;]+;/g,' ').toLocaleLowerCase('tr');
      const repeats=[...plain.matchAll(/(?<!\p{L})([\p{L}]{3,})\s+\1(?!\p{L})/gu)];
      assert.ok(repeats.every(m=>m[1]==='tek'),page.path+' repeated word: '+plain);
    }
  }
  for(const file of ['style.css','app.js','calculators.js']) {
    const text=fs.readFileSync(path.join(out,file),'utf8');
    for(const [,asset] of text.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g))assert.ok(fs.existsSync(path.join(out,asset)),asset);
  }
  assert.equal(publications.length,12);
});

test('preview HTTP methods, redirects, missing files and rejected paths',async t=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const request=(pathname,method='GET')=>new Promise((resolve,reject)=>{
    const req=http.request({hostname:'127.0.0.1',port:server.address().port,path:pathname,method},res=>{
      let body='';res.setEncoding('utf8');res.on('data',chunk=>body+=chunk);res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body}));
    });req.on('error',reject);req.end();
  });
  const home=await request('/');
  assert.equal(home.status,200);assert.match(home.body,/<html lang="tr">/);
  assert.equal(home.headers['x-robots-tag'],'noindex, nofollow');
  assert.match(home.headers['content-security-policy'],/frame-ancestors 'none'/);
  const head=await request('/','HEAD');assert.equal(head.status,200);assert.equal(head.body,'');
  const redirect=await request('/hizmetler');assert.equal(redirect.status,308);assert.equal(redirect.headers.location,'/hizmetler/');
  assert.equal((await request('/missing-page/')).status,404);
  assert.equal((await request('/','POST')).status,405);
  assert.equal((await request('/%ZZ')).status,400);
  assert.equal((await request('/%00')).status,400);
  assert.equal((await request('/.private')).status,403);
  assert.equal((await request('/%2e%2e%2fREADME.md')).status,403);
});

test('production indexing is explicit and validates deployment origin',()=>{
  assert.throws(()=>build({origin:'https://example.com/some-path'}));
  assert.throws(()=>build({out:root}));
  const {out,all}=build({indexable:true});
  assert.match(fs.readFileSync(path.join(out,'index.html'),'utf8'),/index,follow,max-image-preview:large/);
  assert.match(fs.readFileSync(path.join(out,'robots.txt'),'utf8'),/Allow: \//);
  const sitemap=fs.readFileSync(path.join(out,'sitemap.xml'),'utf8');
  assert.equal((sitemap.match(/<loc>/g)||[]).length,all.length-1);
  assert.ok(!sitemap.includes('/404/'));
  build();
});

test('Turkish search and scene boundaries',()=>{
  assert.equal(normalizeSearch('ŞİRKET DEĞERLEMESİ'),'sirket degerlemesi');
  assert.ok(matchesSearch('İnsan Kaynakları ve Bordro','insan bordro'));
  assert.ok(!matchesSearch('Vergi','bordro'));
  assert.ok(matchesSearch('Bağımsız Denetim','bagimsiz'));
  assert.equal(sceneState(100,3300,1000).index,0);
  assert.equal(sceneState(-800,3300,1000).index,1);
  assert.equal(sceneState(-2300,3300,1000).index,2);
  assert.equal(sceneState(-6000,3300,1000).progress,1);
  assert.equal(sceneState(0,0,1000).progress,0);
});

test('calculator results, ceilings, rounding and rejected inputs',()=>{
  const context=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('./public/calculator-core.js',import.meta.url),'utf8'),context);
  const C=context.BoradenCalc;
  assert.equal(C.vat(1000,20).total,1200);
  assert.equal(C.vat(1200,20,true).net,1000);
  assert.equal(C.income(400000).tax,70500);
  assert.equal(C.income(1500000,true).tax,367500);
  assert.equal(C.salary(33030,1,0).net,28075.5);
  const sample=C.salary(60000,4,150000);
  assert.ok(Math.abs(C.grossForNet(sample.net,4,150000).gross-60000)<.03);
  assert.equal(C.salary(400000,1).insured,297270);
  assert.throws(()=>C.vat(-1));assert.throws(()=>C.vat(100,18));assert.throws(()=>C.income(Infinity));assert.throws(()=>C.salary(1));
  const schedule=vehicleSchedule({cost:2000000,month:9,kind:'new-net'});
  assert.equal(schedule.limit,1380000);
  assert.equal(Math.round(schedule.rows.reduce((n,r)=>n+r.book,0)*100),200000000);
  assert.equal(Math.round(schedule.rows.reduce((n,r)=>n+r.deductible,0)*100),138000000);
  assert.ok(schedule.rows.every(r=>r.book>=r.deductible));
  assert.throws(()=>vehicleSchedule({cost:1,month:13,kind:'new-net'}));
  assert.throws(()=>vehicleSchedule({cost:1,month:1,kind:'new-net',year:2027}));
});
