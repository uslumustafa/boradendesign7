import { heroMotionAllowed, worldLabelPosition } from './ui-core.js';

const section=typeof document==='undefined'?null:document.querySelector('section.world');
if(section) prepareWorld(section);

function prepareWorld(section) {
  const stage=section.querySelector('.world-stage');
  if(!stage) return;
  let started=false;
  const load=async()=>{
    if(started) return;
    started=true;
    try { await startWorld(section,stage); }
    catch { section.classList.add('world-fallback'); }
  };
  if('IntersectionObserver' in window) {
    const loader=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting) return;
      loader.disconnect();
      load();
    },{rootMargin:'250px'});
    loader.observe(section);
  } else load();
}

async function startWorld(section,stage) {
  const THREE=await import('./assets/vendor/three.module.js');
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  const canvas=renderer.domElement;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1,1.5));
  renderer.setClearColor(0x080d13,0);
  canvas.tabIndex=0;
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label','Türkiye ve İngiltere arasında temsilî bağlantı gösteren dünya küresi. Yön tuşlarıyla döndürün; Home ile Türkiye’ye dönün.');
  canvas.style.touchAction='pan-y';
  stage.prepend(canvas);
  let texture;
  try {
    texture=await new THREE.TextureLoader().loadAsync('/assets/earth/nasa-night.jpg');
  } catch(error) {
    renderer.dispose();
    canvas.remove();
    throw error;
  }
  texture.colorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(39,1,.1,100);
  const globe=new THREE.Group();
  scene.add(globe);
  scene.add(new THREE.AmbientLight(0x668fb8,.075));
  const sun=new THREE.DirectionalLight(0x94c9ff,2.2);
  sun.position.set(-4,2,-2.8);
  scene.add(sun);
  const fill=new THREE.DirectionalLight(0x326b9d,.25);
  fill.position.set(3,-1,4);
  scene.add(fill);
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.5,64,48),new THREE.MeshPhongMaterial({
    map:texture,emissiveMap:texture,emissive:0xffffff,emissiveIntensity:.95,shininess:12
  })));
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.555,64,48),new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec3 vNormal; varying vec3 vView; void main(){vec4 p=modelViewMatrix*vec4(position,1.0);vNormal=normalize(normalMatrix*normal);vView=-p.xyz;gl_Position=projectionMatrix*p;}',
    fragmentShader:'varying vec3 vNormal; varying vec3 vView; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),3.5);gl_FragColor=vec4(0.18,0.48,0.78,rim*0.65);}'
  })));
  function point(lat,lon,r=1.52) {
    const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
    return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
  }
  // Country-level illustrative endpoints; these do not identify offices or a network.
  const turkey=point(39,35),england=point(53,-1.5);
  const home=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),39*Math.PI/180)
    .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.atan2(-turkey.x,turkey.z)));
  globe.quaternion.copy(home);
  const accent=new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--blue-light').trim());
  const origin=new THREE.Mesh(new THREE.SphereGeometry(.012,16,12),new THREE.MeshBasicMaterial({color:accent}));
  origin.position.copy(turkey);
  globe.add(origin);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.022,.028,40),new THREE.MeshBasicMaterial({
    color:accent,side:THREE.DoubleSide,transparent:true,opacity:.8
  }));
  ring.position.copy(turkey.clone().multiplyScalar(1.002));
  ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),turkey.clone().normalize());
  globe.add(ring);
  const routePoints=[];
  for(let j=0;j<=70;j++) {
    const t=j/70;
    routePoints.push(turkey.clone().lerp(england,t).normalize().multiplyScalar(1.52+Math.sin(Math.PI*t)*.16));
  }
  const route=new THREE.CatmullRomCurve3(routePoints);
  globe.add(new THREE.Mesh(new THREE.TubeGeometry(route,100,.0035,6,false),new THREE.MeshBasicMaterial({color:0x90c9ee})));
  const destination=new THREE.Mesh(new THREE.SphereGeometry(.012,16,12),new THREE.MeshBasicMaterial({color:0xd2ebff}));
  destination.position.copy(england);
  globe.add(destination);
  const routeDot=new THREE.Mesh(new THREE.SphereGeometry(.008,12,8),new THREE.MeshBasicMaterial({color:0xffffff}));
  routeDot.position.copy(turkey);
  globe.add(routeDot);
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const originLabel=section.querySelector('.world-origin');
  const orbisLabel=section.querySelector('.world-orbis');
  let visibility='IntersectionObserver' in window?0:1,frame=0,last=0,elapsed=0,returning=false,drag=null;
  const canPlay=()=>heroMotionAllowed(root.classList.contains('motion-off') || reduced.matches,document.hidden,visibility,
    root.classList.contains('dialog-open') || root.classList.contains('navigation-open') || Boolean(document.querySelector('dialog[open]')));
  function draw() {
    globe.updateMatrixWorld(true);
    for(const [anchor,label] of [[turkey,originLabel],[england,orbisLabel]]) {
      if(!label) continue;
      const p=anchor.clone().applyMatrix4(globe.matrixWorld);
      const front=p.z>1.5*1.5/camera.position.z;
      p.project(camera);
      label.style.opacity=front?'1':'0';
      const position=worldLabelPosition((p.x*.5+.5)*stage.clientWidth,(-p.y*.5+.5)*stage.clientHeight,
        stage.clientWidth,stage.clientHeight,label.offsetWidth,label.offsetHeight,label===originLabel);
      label.style.left=position.left+'px';
      label.style.top=position.top+'px';
    }
    renderer.render(scene,camera);
  }
  function tick(now) {
    frame=0;
    if(!canPlay()) return;
    const dt=Math.max(0,Math.min((now-last)/1000,.1));
    last=now;
    elapsed+=dt;
    if(returning) {
      globe.quaternion.slerp(home,1-Math.exp(-dt*4));
      if(globe.quaternion.angleTo(home)<.002) returning=false;
    } else if(!drag) globe.rotateY(dt*.035);
    ring.scale.setScalar(1+Math.sin(elapsed*2)*.12);
    routeDot.position.copy(route.getPoint((elapsed*.16)%1));
    draw();
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame=0;
    if(canPlay()) {
      last=performance.now();
      frame=requestAnimationFrame(tick);
    } else draw();
  }
  function resize() {
    const width=stage.clientWidth,height=stage.clientHeight;
    if(!width || !height) return;
    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.position.z=5/Math.min(1,camera.aspect);
    camera.updateProjectionMatrix();
    draw();
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  if('IntersectionObserver' in window) new IntersectionObserver(([entry])=>{
    visibility=entry.intersectionRatio;
    sync();
  },{threshold:[0,.2]}).observe(stage);
  const stateObserver=new MutationObserver(sync);
  stateObserver.observe(root,{attributes:true,attributeFilter:['class']});
  document.querySelectorAll('dialog').forEach(dialog=>stateObserver.observe(dialog,{attributes:true,attributeFilter:['open']}));
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  function reset() {
    elapsed=0;
    returning=canPlay();
    if(!returning) globe.quaternion.copy(home);
    draw();
  }
  section.querySelector('.world-home')?.addEventListener('click',reset);
  const screenX=new THREE.Vector3(1,0,0),screenY=new THREE.Vector3(0,1,0);
  function rotate(horizontal,vertical) {
    returning=false;
    globe.rotateOnWorldAxis(screenY,horizontal);
    globe.rotateOnWorldAxis(screenX,vertical);
    draw();
  }
  canvas.addEventListener('keydown',event=>{
    if(event.key==='Home') { event.preventDefault(); reset(); return; }
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    rotate(event.key==='ArrowLeft'?-.12:event.key==='ArrowRight'?.12:0,event.key==='ArrowUp'?-.12:event.key==='ArrowDown'?.12:0);
  });
  canvas.addEventListener('pointerdown',event=>{
    if(drag || event.pointerType==='touch' || event.button!==0) return;
    drag={id:event.pointerId,x:event.clientX,y:event.clientY};
    returning=false;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove',event=>{
    if(!drag || event.pointerId!==drag.id) return;
    rotate((event.clientX-drag.x)*.004,(event.clientY-drag.y)*.004);
    drag.x=event.clientX;
    drag.y=event.clientY;
  });
  const release=event=>{
    if(!drag || event.pointerId!==drag.id) return;
    drag=null;
    if(canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };
  canvas.addEventListener('pointerup',release);
  canvas.addEventListener('pointercancel',release);
  canvas.addEventListener('lostpointercapture',release);
  section.classList.add('world-ready');
  sync();
}
