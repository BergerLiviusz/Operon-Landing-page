/**
 * Operon landing — navbar "+" icon hovers without dropdown panels.
 * initNavbarReveal is no-op'd in 50007.js; this restores icon-only feedback.
 */
(function () {
  function hideDropdownPanels() {
    document.querySelectorAll("#navigation .navbar-content").forEach((panel) => {
      panel.style.display = "none";
      panel.setAttribute("aria-hidden", "true");
    });
  }

  function bindIconHovers() {
    if (typeof gsap === "undefined") return false;

    document.querySelectorAll("#navigation .navbar-dd_toggle").forEach((toggle) => {
      if (toggle.dataset.operonIconBound === "1") return;
      toggle.dataset.operonIconBound = "1";

      const icon = toggle.querySelector(".navbar-dd_icon");
      const path = toggle.querySelector(".navbar-dd_icon path");
      if (!path) return;

      gsap.set(path, { transformOrigin: "50% 50%" });

      const rotate = gsap.timeline({ paused: true });
      rotate.to(path, { rotateZ: -135, duration: 0.25, ease: "power2.out" });

      toggle.addEventListener("mouseenter", () => {
        if (icon) gsap.to(icon, { backgroundColor: "#49fdb2", duration: 0.2, overwrite: "auto" });
        rotate.play();
      });

      toggle.addEventListener("mouseleave", () => {
        if (icon) gsap.to(icon, { backgroundColor: "", duration: 0.2, overwrite: "auto" });
        rotate.reverse();
      });
    });

    return true;
  }

  function init() {
    hideDropdownPanels();
    if (!bindIconHovers()) {
      window.addEventListener("gsapReady", init, { once: true });
      const poll = window.setInterval(() => {
        if (bindIconHovers()) window.clearInterval(poll);
      }, 40);
      window.setTimeout(() => window.clearInterval(poll), 12000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", init);
})();
