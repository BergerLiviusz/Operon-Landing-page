/**
 * Operon efficiency chart — Sui payment-coins bar reveal + hover cursor line.
 */
(function initOperonEfficiencyChart() {
  const ROOT_SEL = "[data-operon-efficiency-chart]";

  function initChart(section) {
    if (section.dataset.operonChartInit === "1") return;
    section.dataset.operonChartInit = "1";

    const bars = [...section.querySelectorAll(".operon-efficiency-chart__bar")];
    const plot = section.querySelector(".operon-efficiency-chart__plot");
    const cursorLine = section.querySelector(".operon-efficiency-chart__cursor-line");
    if (!bars.length || !plot) return;

    function setActiveBar(bar) {
      bars.forEach((item) => item.classList.toggle("is--active", item === bar));
      if (!cursorLine || !bar) {
        cursorLine?.classList.remove("is--visible");
        return;
      }

      const plotRect = plot.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      const top = barRect.top - plotRect.top;
      cursorLine.style.top = `${top}px`;
      cursorLine.classList.add("is--visible");
    }

    bars.forEach((bar) => {
      bar.addEventListener("mouseenter", () => setActiveBar(bar));
      bar.addEventListener("focus", () => setActiveBar(bar));
      bar.setAttribute("tabindex", "0");
    });

    plot.addEventListener("mouseleave", () => {
      bars.forEach((item) => item.classList.remove("is--active"));
      cursorLine?.classList.remove("is--visible");
    });

    if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
      bars.forEach((bar) => bar.classList.add("is--revealed"));
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });

    window.gsap.to(bars, {
      scaleY: 1,
      duration: 0.55,
      stagger: 0.045,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
      onComplete: () => {
        bars.forEach((bar) => bar.classList.add("is--revealed"));
      },
    });
  }

  function init() {
    document.querySelectorAll(ROOT_SEL).forEach(initChart);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", init);
})();
