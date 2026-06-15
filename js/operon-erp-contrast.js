/**
 * Operon contrast hero — Sui AI background-track parallax (beams + stripes + dots).
 */
(function initOperonErpContrast() {
  const ROOT_SEL = "[data-operon-erp-contrast]";

  function initStripeParallax() {
    const hero = document.querySelector(".operon-contrast-hero");
    if (!hero || hero.dataset.operonStripeInit === "1") return;
    hero.dataset.operonStripeInit = "1";

    const track = hero.querySelector(".operon-contrast-hero__track");
    const stripes = [...hero.querySelectorAll(".operon-contrast-hero__stripe")];
    const beams = [...hero.querySelectorAll(".operon-contrast-hero__beam")];
    const dots = hero.querySelector(".operon-contrast-hero__dots");
    const trigger = track || hero;

    if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    stripes.forEach((stripe, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const amount = 72 + (i % 4) * 36;
      window.gsap.to(stripe, {
        yPercent: dir * amount,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.55,
        },
      });
    });

    beams.forEach((beam, i) => {
      const dir = beam.classList.contains("operon-contrast-hero__beam--left") ? -1 : 1;
      window.gsap.fromTo(
        beam,
        { yPercent: dir * 8, scaleY: 1.05 },
        {
          yPercent: dir * -28,
          scaleY: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
          },
        },
      );
    });

    if (dots) {
      window.gsap.fromTo(
        dots,
        { y: 0, opacity: 0.72 },
        {
          y: 48,
          opacity: 0.48,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }

    window.ScrollTrigger.refresh();
  }

  function init() {
    if (!document.querySelector(ROOT_SEL)) return;
    initStripeParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", init);
})();
