import {matchesSearch,sceneState} from './ui-core.js';

const root=document.documentElement;
root.classList.add('js');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let manualPause=false;
const story=document.querySelector('[data-story]');
const frames=[...document.querySelectorAll('[data-frame]')];
const header=document.querySelector('.site-header');
const orbit=document.querySelector('.orbit-progress');
const orbitNumber=document.querySelector('.orbit-number');
const sceneButtons=[...document.querySelectorAll('[data-scene]')];
const parallax=[...document.querySelectorAll('[data-parallax]')];
let scheduled=false;
let active=-1;

function renderScroll() {
  scheduled=false;
  const stopped=root.classList.contains('motion-off');
  if(story && !stopped) {
    const rect=story.getBoundingClientRect();
    const state=sceneState(rect.top,rect.height,innerHeight);
    if(active!==state.index) {
      active=state.index;
      frames.forEach((frame,i)=>{frame.classList.toggle('is-active',i===active);frame.inert=i!==active;frame.setAttribute('aria-hidden',String(i!==active));});
      sceneButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===active)));
      if(orbitNumber) orbitNumber.innerHTML=`0${active+1} <small>/ 03</small>`;
    }
    story.style.setProperty('--scene-scale',state.scale);
    if(orbit) orbit.style.strokeDashoffset=282.75*(1-state.progress);
  }
  parallax.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(!stopped && rect.bottom>0 && rect.top<innerHeight) el.style.setProperty('--parallax',Math.max(-30,Math.min(30,(innerHeight/2-rect.top-rect.height/2)*.06))+'px');
  });
  const surface=document.elementFromPoint(innerWidth/2,Math.min(110,innerHeight-1));
  header?.classList.toggle('on-dark',Boolean(surface?.closest('[data-theme="dark"]')));
}
function scheduleScroll() {if(!scheduled){scheduled=true;requestAnimationFrame(renderScroll);}}
function setMotion() {
  const stopped=manualPause || reduced.matches;
  root.classList.toggle('motion-off',stopped);
  active=-1;
  if(stopped) frames.forEach(frame=>{frame.inert=false;frame.removeAttribute('aria-hidden');});
  document.querySelectorAll('[data-motion]').forEach(button=>{
    button.setAttribute('aria-pressed',String(stopped));
    button.disabled=reduced.matches;
    button.innerHTML=reduced.matches ? 'Azaltılmış hareket etkin' : stopped ? 'Hareketi başlat <span aria-hidden="true">▷</span>' : 'Hareketi durdur <span aria-hidden="true">Ⅱ</span>';
  });
  scheduleScroll();
}
document.querySelectorAll('[data-motion]').forEach(b=>b.addEventListener('click',()=>{manualPause=!manualPause;setMotion();}));
reduced.addEventListener('change',setMotion);
setMotion();
addEventListener('scroll',scheduleScroll,{passive:true});
addEventListener('resize',scheduleScroll);
addEventListener('pageshow',scheduleScroll);
sceneButtons.forEach(button=>button.addEventListener('click',()=>{
  const index=Number(button.dataset.scene);
  const top=story.getBoundingClientRect().top+scrollY;
  scrollTo({top:top+Math.max(0,story.offsetHeight-innerHeight)*(index/3+.015),behavior:root.classList.contains('motion-off')?'instant':'smooth'});
}));
if('IntersectionObserver' in window) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}
  }),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
}

document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
  const dialog=document.getElementById(button.dataset.dialog);
  dialog.showModal();
  root.classList.add('dialog-open');
  if(dialog.id==='search-dialog') dialog.querySelector('input').focus();
}));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>root.classList.remove('dialog-open'));
  dialog.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog) return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close();
  });
});
const search=document.querySelector('#site-search');
const searchRows=[...document.querySelectorAll('[data-search]')];
function filterSearch() {
  let count=0;
  searchRows.forEach(row=>{row.hidden=!matchesSearch(row.dataset.search,search.value);if(!row.hidden)count++;});
  document.querySelector('.search-count').textContent=`${count} sonuç`;
  document.querySelector('.search-empty').hidden=count!==0;
}
search.addEventListener('input',filterSearch);
filterSearch();

const expertise=[...document.querySelectorAll('[data-expertise]')];
const expertiseImage=document.querySelector('.expertise-image img');
expertise.forEach(detail=>detail.addEventListener('toggle',()=>{
  if(!detail.open) return;
  expertise.forEach(other=>{if(other!==detail)other.open=false;});
  if(expertiseImage) {
    const name=detail.dataset.expertise;
    expertiseImage.src=`/assets/photos/${name}-1280.webp`;
    expertiseImage.srcset=`/assets/photos/${name}-640.webp 640w, /assets/photos/${name}-1280.webp 1280w, /assets/photos/${name}-2200.webp 2200w`;
    expertiseImage.alt=`Boraden kurumsal çalışma sahnesi: ${detail.querySelector('h3').textContent}`;
  }
}));
const rail=document.querySelector('[data-rail]');
if(rail) {
  const prev=document.querySelector('[data-rail-prev]'),next=document.querySelector('[data-rail-next]');
  const move=direction=>rail.scrollBy({left:rail.clientWidth*.75*direction,behavior:root.classList.contains('motion-off')?'instant':'smooth'});
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  const update=()=>{prev.disabled=rail.scrollLeft<2;next.disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-2;};
  rail.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
}
const archiveSearch=document.querySelector('[data-archive-search]');
if(archiveSearch) {
  const year=document.querySelector('[data-archive-year]');
  const rows=[...document.querySelectorAll('[data-archive-text]')];
  const update=()=>{
    let count=0;
    rows.forEach(row=>{row.hidden=!(matchesSearch(row.dataset.archiveText,archiveSearch.value) && (!year.value || row.dataset.year===year.value));if(!row.hidden)count++;});
    document.querySelector('[data-archive-count]').textContent=`${count} belge`;
    document.querySelector('[data-archive-empty]').hidden=count!==0;
  };
  archiveSearch.addEventListener('input',update);year.addEventListener('change',update);
}
