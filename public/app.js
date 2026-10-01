import {matchesSearch} from './ui-core.js';

const root=document.documentElement;
root.classList.add('js');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let manualPause=false;
const parallax=[...document.querySelectorAll('[data-parallax]')];
let scheduled=false;

function renderScroll() {
  scheduled=false;
  const stopped=root.classList.contains('motion-off');
  parallax.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(!stopped && rect.bottom>0 && rect.top<innerHeight) el.style.setProperty('--parallax',Math.max(-30,Math.min(30,(innerHeight/2-rect.top-rect.height/2)*.06))+'px');
  });
}
function scheduleScroll() {if(!scheduled){scheduled=true;requestAnimationFrame(renderScroll);}}
function setMotion() {
  const stopped=manualPause || reduced.matches;
  root.classList.toggle('motion-off',stopped);
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
