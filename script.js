/* =========================================================
   HYPERBURNER — MOTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =======================================================
     SCROLL REVEALS
  ======================================================= */

  const revealTargets = $$(
    ".section, .stats, .milestones article, .trans-grid > div"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealTargets.forEach((element, index) => {
      if (
        element.matches(".milestones article") ||
        element.matches(".trans-grid > div")
      ) {
        element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
      }

      revealObserver.observe(element);
    });
  } else {
    revealTargets.forEach((element) =>
      element.classList.add("visible")
    );
  }

  /* =======================================================
     NUMBER COUNTERS
  ======================================================= */

  const counters = $$("[data-count]");

  function formatNumber(number) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(Math.round(number));
  }

  function animateCounter(element) {
    if (element.dataset.counted === "true") return;

    element.dataset.counted = "true";

    const target = Number(element.dataset.count);

    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      element.textContent = formatNumber(target);
      return;
    }

    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 4);

      element.textContent = formatNumber(
        target * eased
      );

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = formatNumber(target);
      }
    }

    requestAnimationFrame(update);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.5,
      }
    );

    counters.forEach((counter) =>
      counterObserver.observe(counter)
    );
  } else {
    counters.forEach(animateCounter);
  }

  /* =======================================================
     PARTICLE FIELD
  ======================================================= */

  const particleField = $("#particle-field");

  if (particleField && !reduceMotion) {
    const particleCount =
      window.innerWidth < 600 ? 28 : 55;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");

      particle.className = "hb-particle";

      const size =
        Math.random() * 3.5 + 1;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: rgba(255, ${90 + Math.random() * 120}, 40, ${0.2 + Math.random() * 0.6});
        box-shadow: 0 0 ${size * 5}px rgba(255,90,20,0.45);
        pointer-events: none;
        animation:
          hbParticleFloat ${8 + Math.random() * 14}s ease-in-out ${Math.random() * -10}s infinite;
      `;

      particleField.appendChild(particle);
    }

    const particleStyle =
      document.createElement("style");

    particleStyle.textContent = `
      @keyframes hbParticleFloat {
        0% {
          transform: translate3d(0, 0, 0);
          opacity: 0;
        }

        15% {
          opacity: 0.8;
        }

        50% {
          transform:
            translate3d(
              ${Math.random() * 80 - 40}px,
              -${40 + Math.random() * 100}px,
              0
            );
        }

        85% {
          opacity: 0.4;
        }

        100% {
          transform:
            translate3d(
              ${Math.random() * 120 - 60}px,
              -${100 + Math.random() * 180}px,
              0
            );
          opacity: 0;
        }
      }
    `;

    document.head.appendChild(particleStyle);
  }

  /* =======================================================
     HERO EMBERS
  ======================================================= */

  const flameField = $(".flame-field");

  if (flameField && !reduceMotion) {
    const emberCount =
      window.innerWidth < 600 ? 18 : 34;

    for (let i = 0; i < emberCount; i++) {
      const ember = document.createElement("i");

      const size =
        Math.random() * 4 + 2;

      ember.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * (Math.random() * 1.8 + 0.8)}px;
        left: ${Math.random() * 100}%;
        top: ${35 + Math.random() * 60}%;
        border-radius: 50%;
        background: rgba(255, ${100 + Math.random() * 120}, 40, ${0.35 + Math.random() * 0.65});
        box-shadow: 0 0 ${size * 4}px rgba(255,80,10,0.7);
        transform: rotate(${Math.random() * 80 - 40}deg);
        animation:
          hbEmber ${2.5 + Math.random() * 4}s ease-in ${Math.random() * -5}s infinite;
      `;

      flameField.appendChild(ember);
    }

    const emberStyle =
      document.createElement("style");

    emberStyle.textContent = `
      @keyframes hbEmber {
        0% {
          opacity: 0;
          transform:
            translate3d(0, 30px, 0)
            scale(0.5)
            rotate(0deg);
        }

        15% {
          opacity: 1;
        }

        70% {
          opacity: 0.8;
        }

        100% {
          opacity: 0;
          transform:
            translate3d(
              ${Math.random() * 100 - 50}px,
              -${100 + Math.random() * 180}px,
              0
            )
            scale(0)
            rotate(${Math.random() * 360}deg);
        }
      }
    `;

    document.head.appendChild(emberStyle);
  }

  /* =======================================================
     MONEY / FIRE PARTICLES
  ======================================================= */

  const moneyStream = $(".money-stream");

  if (moneyStream && !reduceMotion) {
    const moneyCount =
      window.innerWidth < 600 ? 8 : 15;

    const symbols = ["$", "HB", "₿"];

    for (let i = 0; i < moneyCount; i++) {
      const money = document.createElement("span");

      money.textContent =
        symbols[
          Math.floor(Math.random() * symbols.length)
        ];

      const size =
        Math.random() * 10 + 10;

      money.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        color: rgba(255, ${140 + Math.random() * 100}, 65, ${0.15 + Math.random() * 0.45});
        font-size: ${size}px;
        font-weight: 900;
        filter: blur(${Math.random() > 0.7 ? 0.4 : 0}px);
        text-shadow: 0 0 15px rgba(255,80,10,0.35);
        pointer-events: none;
        user-select: none;
        animation:
          hbMoneyFloat ${6 + Math.random() * 8}s ease-in-out ${Math.random() * -8}s infinite;
      `;

      moneyStream.appendChild(money);
    }

    const moneyStyle =
      document.createElement("style");

    moneyStyle.textContent = `
      @keyframes hbMoneyFloat {
        0%, 100% {
          transform:
            translate3d(0, 0, 0)
            rotate(0deg);
          opacity: 0;
        }

        15% {
          opacity: 0.7;
        }

        50% {
          transform:
            translate3d(
              ${Math.random() * 100 - 50}px,
              -${40 + Math.random() * 100}px,
              0
            )
            rotate(${Math.random() * 80 - 40}deg);
        }

        85% {
          opacity: 0.35;
        }
      }
    `;

    document.head.appendChild(moneyStyle);
  }

  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroVisual = $(".hero-visual");
  const heroImage = $(".hero-visual img");

  if (
    heroVisual &&
    heroImage &&
    !reduceMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    heroVisual.addEventListener("mousemove", (event) => {
      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
          rect.height -
        0.5;

      targetX = x * 10;
      targetY = y * 8;
    });

    heroVisual.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

    function animateParallax() {
      currentX +=
        (targetX - currentX) * 0.06;

      currentY +=
        (targetY - currentY) * 0.06;

      heroImage.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animateParallax);
    }

    requestAnimationFrame(animateParallax);
  }

  /* =======================================================
     CARD TILT
  ======================================================= */

  if (
    !reduceMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    const tiltCards = $$(
      ".token-card, .milestones article, .trans-grid > div"
    );

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
            rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
            rect.height -
          0.5;

        card.style.transform =
          `perspective(900px)
           rotateX(${y * -3}deg)
           rotateY(${x * 3}deg)
           translateY(-5px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        $(".site-header")?.offsetHeight || 0;

      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        30;

      window.scrollTo({
        top,
        behavior: reduceMotion
          ? "auto"
          : "smooth",
      });
    });
  });

  /* =======================================================
     NAV SCROLL EFFECT
  ======================================================= */

  const nav = $(".nav");

  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 30) {
        nav.style.borderColor =
          "rgba(255,255,255,0.12)";

        nav.style.background =
          "rgba(8,8,8,0.88)";
      } else {
        nav.style.borderColor =
          "rgba(255,255,255,0.08)";

        nav.style.background =
          "linear-gradient(180deg, rgba(20,20,20,0.82), rgba(8,8,8,0.74))";
      }
    };

    window.addEventListener(
      "scroll",
      updateNav,
      { passive: true }
    );

    updateNav();
  }

  /* =======================================================
     ACTIVE SECTION TRACKING
  ======================================================= */

  const sections = $$(
    "section[id]"
  );

  const navLinks = $$(
    '.nav-links a[href^="#"]'
  );

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
              link.style.color = "";

              if (
                link.getAttribute("href") ===
                `#${entry.target.id}`
              ) {
                link.style.color =
                  "#ffffff";
              }
            });
          });
        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
        }
      );

    sections.forEach((section) =>
      sectionObserver.observe(section)
    );
  }

  /* =======================================================
     DYNAMIC COPYRIGHT YEAR
  ======================================================= */

  const yearElements =
    $$("[data-year]");

  yearElements.forEach((element) => {
    element.textContent =
      new Date().getFullYear();
  });

  /* =======================================================
     HERO MOUSE GLOW
  ======================================================= */

  if (
    heroVisual &&
    !reduceMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    const glow =
      document.createElement("div");

    glow.style.cssText = `
      position: absolute;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      opacity: 0;
      transform: translate(-50%, -50%);
      background: radial-gradient(
        circle,
        rgba(255,105,30,0.12),
        transparent 68%
      );
      filter: blur(10px);
      transition: opacity 0.3s ease;
    `;

    heroVisual.appendChild(glow);

    heroVisual.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          heroVisual.getBoundingClientRect();

        glow.style.left =
          `${event.clientX - rect.left}px`;

        glow.style.top =
          `${event.clientY - rect.top}px`;

        glow.style.opacity = "1";
      }
    );

    heroVisual.addEventListener(
      "mouseleave",
      () => {
        glow.style.opacity = "0";
      }
    );
  }

  /* =======================================================
     PAGE READY
  ======================================================= */

  document.documentElement.classList.add(
    "hb-ready"
  );

  console.log(
    "%cHYPERBURNER",
    "font-size:20px;font-weight:900;color:#ff641c;"
  );

  console.log(
    "%cBurn the ordinary.",
    "font-size:12px;color:#aaa;"
  );
});
