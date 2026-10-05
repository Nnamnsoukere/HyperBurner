/* =========================================================
   HYPERBURNER — MOTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     1. SCROLL REVEAL SYSTEM
     ------------------------------------------------------- */

  const revealEls = document.querySelectorAll(
    ".section, .stats, .milestones article, .trans-grid > div, .pool, .community-card"
  );

  revealEls.forEach((el) => {
    el.classList.add("hb-reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("hb-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));


  /* -------------------------------------------------------
     2. HERO PARTICLE / EMBER SYSTEM
     ------------------------------------------------------- */

  const hero = document.querySelector(".hero");

  if (hero) {

    const particleContainer = document.createElement("div");
    particleContainer.className = "hb-particles";

    hero.appendChild(particleContainer);

    for (let i = 0; i < 34; i++) {

      const particle = document.createElement("span");

      particle.className = "hb-particle";

      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 7 + 6;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particleContainer.appendChild(particle);
    }
  }


  /* -------------------------------------------------------
     3. MONEY PARTICLE SYSTEM
     ------------------------------------------------------- */

  const heroArt = document.querySelector(".hero-art");

  if (heroArt) {

    const moneyContainer = document.createElement("div");
    moneyContainer.className = "hb-money-stream";

    heroArt.appendChild(moneyContainer);

    for (let i = 0; i < 18; i++) {

      const bill = document.createElement("span");

      bill.className = "hb-bill";

      bill.innerHTML = "$";

      bill.style.setProperty(
        "--x",
        `${Math.random() * 260 - 130}px`
      );

      bill.style.setProperty(
        "--y",
        `${Math.random() * 180 - 90}px`
      );

      bill.style.setProperty(
        "--r",
        `${Math.random() * 80 - 40}deg`
      );

      bill.style.animationDelay = `${Math.random() * 4}s`;
      bill.style.animationDuration = `${3 + Math.random() * 3}s`;

      moneyContainer.appendChild(bill);
    }
  }


  /* -------------------------------------------------------
     4. HERO MOUSE PARALLAX
     ------------------------------------------------------- */

  const heroImage = document.querySelector(".hero-art > img");

  if (hero && heroImage && window.matchMedia("(pointer:fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      mouseX = x;
      mouseY = y;
    });

    const animateParallax = () => {

      const moveX = mouseX * 16;
      const moveY = mouseY * 12;

      heroImage.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 0)`;

      requestAnimationFrame(animateParallax);
    };

    animateParallax();
  }


  /* -------------------------------------------------------
     5. SCROLL PARALLAX
     ------------------------------------------------------- */

  if (heroImage) {

    window.addEventListener(
      "scroll",
      () => {

        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight * 1.2) {

          const amount = scrollY * 0.08;

          heroImage.style.marginTop = `${amount}px`;
        }
      },
      { passive: true }
    );
  }


  /* -------------------------------------------------------
     6. ANIMATED COUNTERS
     ------------------------------------------------------- */

  const counters = document.querySelectorAll("[data-count]");

  const countObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const el = entry.target;

        const target = Number(el.dataset.count);

        if (!Number.isFinite(target)) return;

        const duration = 1600;
        const startTime = performance.now();

        const animateCounter = (currentTime) => {

          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const eased =
            1 - Math.pow(1 - progress, 4);

          const value =
            Math.floor(target * eased);

          el.textContent =
            value.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          }
        };

        requestAnimationFrame(animateCounter);

        countObserver.unobserve(el);
      });
    },
    {
      threshold: 0.7
    }
  );

  counters.forEach((counter) => {
    countObserver.observe(counter);
  });


  /* -------------------------------------------------------
     7. TOKENOMICS HOVER MOTION
     ------------------------------------------------------- */

  const cards = document.querySelectorAll(
    ".allocation > div, .airdrop article, .trans-grid > div"
  );

  cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(700px)
         rotateX(${y * -4}deg)
         rotateY(${x * 4}deg)
         translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = "";
    });
  });


  /* -------------------------------------------------------
     8. HERO FLAME INTENSITY
     ------------------------------------------------------- */

  const flames =
    document.querySelectorAll(".flame");

  flames.forEach((flame, index) => {

    flame.style.animationDelay =
      `${index * -0.35}s`;
  });


  /* -------------------------------------------------------
     9. RANDOM AMBIENT EMBERS
     ------------------------------------------------------- */

  const emberLayer =
    document.querySelector(".embers");

  if (emberLayer) {

    for (let i = 0; i < 25; i++) {

      const ember =
        document.createElement("i");

      ember.className =
        "hb-floating-ember";

      ember.style.left =
        `${Math.random() * 100}%`;

      ember.style.animationDelay =
        `${Math.random() * 10}s`;

      ember.style.animationDuration =
        `${7 + Math.random() * 8}s`;

      emberLayer.appendChild(ember);
    }
  }


  /* -------------------------------------------------------
     10. SMOOTH ANCHOR NAVIGATION
     ------------------------------------------------------- */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

});


/* =========================================================
   HYPERBURNER MOTION CSS
   Injected by JavaScript
   ========================================================= */

const hbMotionStyle =
document.createElement("style");

hbMotionStyle.textContent = `

/* Scroll reveals */

.hb-reveal {
  opacity: 0;
  transform: translateY(45px) scale(.985);
  transition:
    opacity .9s cubic-bezier(.16,1,.3,1),
    transform .9s cubic-bezier(.16,1,.3,1);
}

.hb-visible {
  opacity: 1 !important;
  transform: none !important;
}


/* Particle field */

.hb-particles {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.hb-particle {
  position: absolute;
  bottom: -20px;

  display: block;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      #fff4c2 0%,
      #ffb000 35%,
      #ff4d00 70%,
      transparent 100%
    );

  box-shadow:
    0 0 12px #ff7100,
    0 0 28px rgba(255,80,0,.55);

  opacity: 0;

  animation:
    hbRise linear infinite;
}

@keyframes hbRise {

  0% {
    transform:
      translate3d(0, 0, 0)
      scale(.2)
      rotate(0deg);

    opacity: 0;
  }

  12% {
    opacity: .9;
  }

  50% {
    transform:
      translate3d(30px, -45vh, 0)
      scale(1)
      rotate(180deg);
  }

  85% {
    opacity: .65;
  }

  100% {
    transform:
      translate3d(-30px, -110vh, 0)
      scale(.1)
      rotate(360deg);

    opacity: 0;
  }
}


/* Money stream */

.hb-money-stream {
  position: absolute;
  left: 50%;
  top: 47%;

  width: 1px;
  height: 1px;

  z-index: 9;
  pointer-events: none;
}

.hb-bill {
  position: absolute;

  width: 54px;
  height: 29px;

  display: grid;
  place-items: center;

  border:
    1px solid rgba(255,220,140,.75);

  border-radius: 4px;

  background:
    linear-gradient(
      135deg,
      #ffe18a,
      #c87519 45%,
      #ffe8ad
    );

  color: rgba(78,38,0,.85);

  font-size: 15px;
  font-weight: 900;

  box-shadow:
    0 0 20px rgba(255,105,0,.3);

  opacity: 0;

  animation:
    hbMoneyShoot ease-out infinite;
}

@keyframes hbMoneyShoot {

  0% {
    transform:
      translate3d(0,0,0)
      rotate(0deg)
      scale(.35);

    opacity: 0;
  }

  12% {
    opacity: 1;
  }

  55% {
    transform:
      translate3d(
        var(--x),
        var(--y),
        0
      )
      rotate(var(--r))
      scale(1);
  }

  100% {
    transform:
      translate3d(
        calc(var(--x) * 1.9),
        calc(var(--y) * 2.2),
        0
      )
      rotate(calc(var(--r) * 2))
      scale(.35);

    opacity: 0;
  }
}


/* Floating embers */

.hb-floating-ember {
  position: absolute;

  bottom: -10px;

  width: 3px;
  height: 3px;

  border-radius: 50%;

  background: #ff8a00;

  box-shadow:
    0 0 10px #ff6a00,
    0 0 22px rgba(255,80,0,.5);

  animation:
    hbEmberRise linear infinite;
}

@keyframes hbEmberRise {

  0% {
    transform:
      translateY(0)
      translateX(0)
      scale(.3);

    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  50% {
    transform:
      translateY(-50vh)
      translateX(25px)
      scale(1);
  }

  100% {
    transform:
      translateY(-110vh)
      translateX(-30px)
      scale(.2);

    opacity: 0;
  }
}


/* Stronger hero breathing */

.hero-art::after {
  content: "";

  position: absolute;

  width: 70%;
  height: 70%;

  left: 15%;
  top: 15%;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(255,115,0,.11),
      transparent 65%
    );

  filter: blur(35px);

  animation:
    hbHeroGlow 3s ease-in-out infinite;
}

@keyframes hbHeroGlow {

  0%,100% {
    opacity: .55;
    transform: scale(.92);
  }

  50% {
    opacity: 1;
    transform: scale(1.12);
  }
}

`;

document.head.appendChild(hbMotionStyle);
