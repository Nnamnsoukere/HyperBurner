(() => {
'use strict';
const body=document.body, canvas=document.getElementById('scene'), ctx=canvas.getContext('2d'), rain=document.getElementById('rain'), hero=document.getElementById('heroArt');
let W=0,H=0,dpr=1,particles=[],embers=[],smokes=[],shots=[],mouse={x:0,y:0},scrollY=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
addEventListener('resize',resize);resize();
addEventListener('pointermove',e=>{mouse.x=e.clientX/W-.5;mouse.y=e.clientY/H-.5});
addEventListener('scroll',()=>scrollY=scrollY||window.scrollY);
function rand(a,b){return a+Math.random()*(b-a)}
function seed(){for(let i=0;i<190;i++)embers.push({x:Math.random()*W,y:Math.random()*H,vx:rand(-.15,.15),vy:rand(-.7,-.15),s:rand(.5,2.4),a:rand(.2,.85),life:rand(40,160)});for(let i=0;i<24;i++)smokes.push({x:Math.random()*W,y:H+rand(0,300),s:rand(30,90),vx:rand(-.3,.3),vy:rand(-.25,-.7),a:rand(.04,.13)})}
seed();
function fireParticle(p){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s*5);g.addColorStop(0,'rgba(255,245,180,'+p.a+')');g.addColorStop(.18,'rgba(255,160,25,'+p.a*.9+')');g.addColorStop(.55,'rgba(255,50,0,'+p.a*.45+')');g.addColorStop(1,'rgba(255,20,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.s*5,0,Math.PI*2);ctx.fill();ctx.restore()}
function spawnShot(){const r=hero.getBoundingClientRect();shots.push({x:r.left+r.width*.21,y:r.top+r.height*.5,t:0,life:42});for(let i=0;i<18;i++)particles.push({x:r.left+r.width*.2,y:r.top+r.height*.5,vx:rand(1,7),vy:rand(-3,3),s:rand(1,4),a:1,life:rand(15,35)})}
function frame(t){ctx.clearRect(0,0,W,H);if(!reduced){
  // atmospheric ember field
  for(const p of embers){p.x+=p.vx+mouse.x*.25;p.y+=p.vy;if(p.y< -20){p.y=H+20;p.x=Math.random()*W}p.life--;if(p.life<0){p.life=rand(50,180);p.x=Math.random()*W;p.y=H+10}fireParticle(p)}
  // smoke layers
  for(const s of smokes){s.x+=s.vx+mouse.x*.12;s.y+=s.vy;if(s.y<-s.s*2){s.y=H+100;s.x=Math.random()*W}ctx.save();ctx.globalAlpha=s.a;ctx.fillStyle='#4a2715';ctx.filter='blur(20px)';ctx.beginPath();ctx.ellipse(s.x,s.y,s.s,s.s*.7,0,0,Math.PI*2);ctx.fill();ctx.restore()}
  // muzzle/shot particles
  if(performance.now()%130<18 && hero.getBoundingClientRect().top<innerHeight) spawnShot();
  shots=shots.filter(s=>{s.t++;ctx.save();ctx.globalCompositeOperation='lighter';const a=Math.max(0,1-s.t/s.life);const g=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,70);g.addColorStop(0,'rgba(255,250,210,'+a+')');g.addColorStop(.15,'rgba(255,175,35,'+a+')');g.addColorStop(.5,'rgba(255,45,0,'+a*.5+')');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(s.x,s.y,70*a,0,Math.PI*2);ctx.fill();ctx.restore();return s.t<s.life});
  particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.vx*=.98;p.life--;p.a=p.life/35;fireParticle(p);return p.life>0});
}
requestAnimationFrame(frame)}
requestAnimationFrame(frame);
// Falling money: DOM elements for crisp bill-like motion and performance.
function makeBill(){const b=document.createElement('div');b.className='bill'+(Math.random()<.26?' burning':'');const left=rand(-3,103),dur=rand(4.8,10),delay=rand(-10,0),rot=rand(-720,720),drift=rand(-180,180),scale=rand(.55,1.45);b.style.left=left+'vw';b.style.top='-40px';b.style.setProperty('--drift',drift+'px');b.style.setProperty('--rot',rot+'deg');b.style.setProperty('--scale',scale);b.style.animation=`rainMoney ${dur}s linear ${delay}s infinite`;rain.appendChild(b)}
const style=document.createElement('style');style.textContent='@keyframes rainMoney{0%{transform:translate3d(0,-60px,0) rotate(0) scale(var(--scale));opacity:0}7%{opacity:.82}45%{transform:translate3d(calc(var(--drift)*.35),52vh,0) rotate(calc(var(--rot)*.45)) scale(var(--scale))}100%{transform:translate3d(var(--drift),110vh,0) rotate(var(--rot)) scale(var(--scale));opacity:0}}';document.head.appendChild(style);for(let i=0;i<28;i++)makeBill();
// Reveal system
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
// Counter
const counter=document.querySelector('[data-count]');const cio=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;let n=0,target=+counter.dataset.count;const tick=()=>{n=Math.min(target,n+Math.ceil(target/55));counter.textContent=n.toLocaleString();if(n<target)requestAnimationFrame(tick)};tick();cio.disconnect()},{threshold:.5});cio.observe(counter);
// Parallax hero artwork
addEventListener('scroll',()=>{if(reduced)return;const y=scrollY;hero.style.transform=`translate3d(${mouse.x*8}px,${Math.min(y*.08,35)+mouse.y*8}px,0)`});
setTimeout(()=>body.classList.add('loaded'),850);
})();
