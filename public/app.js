import {matchesSearch,archivePageState,heroMotionAllowed,cardLightingPosition} from './ui-core.js';

const root=document.documentElement;
root.classList.add('js');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let manualPause=false;
const siteHeader=document.querySelector('.site-header');
const heroStage=document.querySelector('[data-hero-stage]');
const heroScenes=[...document.querySelectorAll('[data-hero-scene]')];
const heroSelect=[...document.querySelectorAll('[data-hero-select]')];
const navigationMenus=[...document.querySelectorAll('.nav-menu')];
let heroIndex=0,heroVisibility=1,heroTimer;
let scheduled=false;

function showHeroScene(index,announce=false) {
  heroIndex=(index+heroScenes.length)%heroScenes.length;
  heroScenes.forEach((scene,i)=>{scene.classList.toggle('is-active',i===heroIndex);scene.setAttribute('aria-hidden',String(i!==heroIndex));});
  heroSelect.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===heroIndex)));
  document.querySelector('[data-hero-count]').textContent=`${String(heroIndex+1).padStart(2,'0')} / 03`;
  if(announce) document.querySelector('[data-hero-announcement]').textContent=`${heroScenes[heroIndex].dataset.heroScene}, ${heroIndex+1} / 3`;
}
function syncHeroMotion() {
  clearInterval(heroTimer);
  const running=heroScenes.length>1 && heroMotionAllowed(root.classList.contains('motion-off'),document.hidden,heroVisibility,root.classList.contains('dialog-open') || navigationMenus.some(menu=>menu.open));
  heroStage?.classList.toggle('scene-paused',!running);
  if(running) {
    heroTimer=setInterval(()=>showHeroScene(heroIndex+1),7000);
  }
}
heroSelect.forEach(button=>button.addEventListener('click',()=>{showHeroScene(Number(button.dataset.heroSelect),true);syncHeroMotion();}));
document.addEventListener('visibilitychange',syncHeroMotion);
navigationMenus.forEach(menu=>menu.addEventListener('toggle',()=>{root.classList.toggle('navigation-open',navigationMenus.some(item=>item.open));syncHeroMotion();}));
document.addEventListener('pointerdown',event=>navigationMenus.forEach(menu=>{if(menu.open && !menu.contains(event.target))menu.open=false;}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')navigationMenus.forEach(menu=>{if(menu.open){menu.open=false;menu.querySelector('summary').focus();}});});

function renderScroll() {
  scheduled=false;
  const stopped=root.classList.contains('motion-off');
  siteHeader.classList.toggle('is-scrolled',scrollY>40);
  if(innerWidth<=1080)navigationMenus.forEach(menu=>{menu.open=false;});
  if(heroStage && !stopped)heroStage.style.setProperty('--hero-shift',Math.min(3,scrollY*.01)+'px');
}
function scheduleScroll() {if(!scheduled){scheduled=true;requestAnimationFrame(renderScroll);}}
function setMotion() {
  const stopped=manualPause || reduced.matches;
  root.classList.toggle('motion-off',stopped);
  document.querySelectorAll('[data-motion]').forEach(button=>{
    button.setAttribute('aria-pressed',String(stopped));
    button.disabled=reduced.matches;
    button.textContent=reduced.matches ? 'Azaltılmış hareket etkin' : stopped ? 'Hareketi başlat' : 'Hareketi durdur';
  });
  scheduleScroll();
  syncHeroMotion();
}
document.querySelectorAll('[data-motion]').forEach(b=>b.addEventListener('click',()=>{manualPause=!manualPause;setMotion();}));
reduced.addEventListener('change',setMotion);
setMotion();
document.querySelectorAll('[data-spotlight]').forEach(card=>{
  let pointerFrame;
  card.addEventListener('pointermove',event=>{
    if(pointerFrame || root.classList.contains('motion-off') || event.pointerType!=='mouse')return;
    const x=event.clientX,y=event.clientY;
    pointerFrame=requestAnimationFrame(()=>{
      pointerFrame=undefined;
      const rect=card.getBoundingClientRect();
      const state=cardLightingPosition(x-rect.left,y-rect.top,rect.width,rect.height);
      card.style.setProperty('--mx',state.x+'%');card.style.setProperty('--my',state.y+'%');
      card.style.setProperty('--rx',state.rotateX+'deg');card.style.setProperty('--ry',state.rotateY+'deg');
    });
  });
  card.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);pointerFrame=undefined;['--mx','--my','--rx','--ry'].forEach(name=>card.style.removeProperty(name));});
});
addEventListener('scroll',scheduleScroll,{passive:true});
addEventListener('resize',scheduleScroll);
addEventListener('pageshow',scheduleScroll);
if('IntersectionObserver' in window) {
  if(heroStage) new IntersectionObserver(([entry])=>{heroVisibility=entry.intersectionRatio;syncHeroMotion();},{threshold:.2}).observe(heroStage);
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}
  }),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
}

document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
  const dialog=document.getElementById(button.dataset.dialog);
  dialog.showModal();
  root.classList.add('dialog-open');
  syncHeroMotion();
  if(dialog.id==='search-dialog') dialog.querySelector('input').focus();
}));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{root.classList.remove('dialog-open');syncHeroMotion();});
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
  const records=rows.map(row=>({text:row.dataset.archiveText,year:row.dataset.year}));
  const previous=document.querySelector('[data-archive-prev]');
  const next=document.querySelector('[data-archive-next]');
  let page=1;
  const update=()=>{
    const state=archivePageState(records,archiveSearch.value,year.value,page);
    page=state.current;
    rows.forEach((row,index)=>{row.hidden=!state.indices.includes(index);});
    document.querySelector('[data-archive-count]').textContent=`${state.count} belge`;
    document.querySelector('[data-archive-empty]').hidden=state.count!==0;
    document.querySelector('[data-archive-page]').textContent=`${page} / ${state.pages}`;
    previous.disabled=page===1;next.disabled=page===state.pages;
  };
  const filter=()=>{page=1;update();};
  archiveSearch.addEventListener('input',filter);year.addEventListener('change',filter);
  previous.addEventListener('click',()=>{page--;update();});
  next.addEventListener('click',()=>{page++;update();});
  update();
}
