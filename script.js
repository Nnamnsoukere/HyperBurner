// Embers
const canvas = document.getElementById('embers');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Ember {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.6 + 0.2;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 100, 0, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 70; i++) {
  particles.push(new Ember());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// Counters
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = +el.getAttribute('data-target');
  const duration = 2000;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    el.textContent = Math.floor(progress * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
};

// GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-content", { opacity: 0, x: -80, duration: 1.2, ease: "power3.out" });
gsap.from(".hero-cat", { opacity: 0, x: 80, duration: 1.2, ease: "power3.out", delay: 0.2 });

gsap.from(".stat-card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".stats-section",
    start: "top 80%",
    onEnter: () => counters.forEach(animateCounter)
  }
});

gsap.from(".burn-card", {
  opacity: 0,
  y: 50,
  duration: 0.9,
  stagger: 0.15,
  scrollTrigger: {
    trigger: "#burn-tracker",
    start: "top 75%"
  }
});

gsap.to("#burn-progress", {
  width: "32%",
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#burn-tracker",
    start: "top 70%"
  }
});

gsap.from(".airdrop-card", {
  opacity: 0,
  y: 60,
  duration: 0.9,
  stagger: 0.15,
  scrollTrigger: {
    trigger: "#airdrop",
    start: "top 75%"
  }
});

gsap.from(".roadmap-item", {
  opacity: 0,
  x: -40,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#roadmap",
    start: "top 75%"
  }
});
