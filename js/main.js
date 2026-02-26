document.addEventListener("DOMContentLoaded", () => {
  // Easter Egg in Terminal
  initializeTerminalEasterEgg();

  // Initialize Custom Cursor
  initCustomCursor();

  // Initialize Smooth Scrolling (Lenis)
  initSmoothScroll();

  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Register GSAP plugins & Animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    initAnimations();
    initAdvancedAnimations();
  }

  initFormValidation();

  function initializeTerminalEasterEgg() {
    console.log(
      "%c    ___  ____  ___  ____  \n   / _ \\/ __ \\/ _ \\/ __ \\ \n  / /_/ / /_/ / /_/ / /_/ / \n / .___/\\____/\\____/ .___/  \n/_/               /_/       ",
      "color: #10b981; font-weight: bold; font-family: monospace;",
    );
    console.log(
      "%c[SYSTEM SECURED] %cWelcome to the execution runtime. You've uncovered the architecture terminal.",
      "color: #10b981; font-weight: bold;",
      "color: #a1a1aa;",
    );
    console.log(
      "%c>> Execute %cRehmat.architect()%c to view the underlying schematic.",
      "color: #a1a1aa;",
      "color: #10b981; font-family: monospace;",
      "color: #a1a1aa;",
    );

    window.Rehmat = {
      architect: () => {
        console.table({
          "Execution Layer": "Vanilla JavaScript Edge Logic",
          "Style Engine": "CSS Native / ShadCN Structure",
          "Animation Framework": "GreenSock (GSAP) + ScrollTrigger",
          "Smooth Physics": "Lenis Virtual Scroll",
          "Server Logic": "Decoupled / Serverless Architect",
        });
        return "[SCHEMATIC DEPLOYED SUCCESSFULLY]";
      },
    };
  }

  function initSmoothScroll() {
    if (typeof Lenis !== "undefined") {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0, 0);
    }
  }

  function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return;

    // Follow mouse
    document.addEventListener("mousemove", (e) => {
      // Using quickTo for performance
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    });

    // Hover effect on interactable elements
    const interactables = document.querySelectorAll(
      "a, button, input, textarea, select, .card, .btn",
    );

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("hovering"),
      );
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });
    document.addEventListener("mouseenter", () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    });
  }

  function initAnimations() {
    const blocks = document.querySelectorAll(".gsap-block");
    blocks.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 50 });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });
  }

  function initAdvancedAnimations() {
    // Parallax effect for the hero background graphic
    const graphic = document.querySelector(".graphic-image");
    if (graphic) {
      gsap.set(graphic, { scale: 1.05 });
      gsap.to(graphic, {
        y: 40,
        scrollTrigger: {
          trigger: graphic.parentElement,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Staggered text reveal on Hero Title
    const heroTitle = document.querySelector("h1");
    if (heroTitle) {
      gsap.fromTo(
        heroTitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power4.out", delay: 0.2 },
      );
    }

    // Staggered grid cards
    const grids = document.querySelectorAll(".grid-cols-2, .grid-cols-3");
    grids.forEach((grid) => {
      const cards = grid.querySelectorAll(".card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    });
  }

  function initFormValidation() {
    const form = document.querySelector("#contactForm");
    if (!form) return;

    const messageDiv = document.createElement("div");
    messageDiv.style.padding = "16px";
    messageDiv.style.marginBottom = "24px";
    messageDiv.style.borderRadius = "var(--radius)";
    messageDiv.style.display = "none";
    messageDiv.style.fontFamily = "var(--font-heading)";
    messageDiv.style.fontSize = "0.875rem";
    messageDiv.style.border = "1px solid transparent";

    form.prepend(messageDiv);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name").value;
      const email = form.querySelector("#email").value;

      if (!name || !email) {
        messageDiv.textContent = "Error: Required fields are incomplete.";
        messageDiv.style.display = "block";
        messageDiv.style.background = "rgba(220, 38, 38, 0.1)"; // Red
        messageDiv.style.color = "#ef4444";
        messageDiv.style.borderColor = "rgba(239, 68, 68, 0.2)";
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "Transmitting...";
      btn.disabled = true;
      btn.style.opacity = "0.7";
      btn.style.cursor = "not-allowed";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";

        messageDiv.textContent =
          "Transmission successful. We will contact you soon.";
        messageDiv.style.display = "block";
        messageDiv.style.background = "rgba(16, 185, 129, 0.1)"; // Emerald
        messageDiv.style.color = "var(--primary)";
        messageDiv.style.borderColor = "rgba(16, 185, 129, 0.2)";

        form.reset();
      }, 1500);
    });
  }
});
