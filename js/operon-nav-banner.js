/**
 * Operon pencil banner: show on every page load; dismiss via X for this visit only.
 */
(function initOperonPencilBanner() {
  function resetBanner(banner) {
    banner.classList.remove("is-dismissed");
    banner.style.removeProperty("display");
    banner.style.removeProperty("height");
    banner.style.removeProperty("opacity");
    banner.style.removeProperty("padding-top");
    banner.style.removeProperty("padding-bottom");
    banner.style.removeProperty("margin-bottom");
  }

  function hideBanner(banner, animate) {
    const finish = () => {
      banner.classList.add("is-dismissed");
      banner.style.display = "none";
      banner.style.height = "";
      banner.style.opacity = "";
      banner.style.paddingTop = "";
      banner.style.paddingBottom = "";
      banner.style.marginBottom = "";
    };

    if (animate && window.gsap) {
      window.gsap.to(banner, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: finish,
      });
    } else {
      finish();
    }
  }

  function bind() {
    const banner = document.querySelector("[nav-banner].pencil_layout");
    if (!banner || banner.dataset.operonBannerBound === "1") return;

    banner.dataset.operonBannerBound = "1";
    resetBanner(banner);

    banner.addEventListener(
      "click",
      (event) => {
        if (!event.target.closest(".icon-x")) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        hideBanner(banner, true);
      },
      true,
    );

    banner.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!event.target.closest(".icon-x")) return;

      event.preventDefault();
      event.stopPropagation();
      hideBanner(banner, true);
    });

    const close = banner.querySelector(".icon-x");
    if (close) {
      close.setAttribute("role", "button");
      close.setAttribute("tabindex", "0");
      close.setAttribute("aria-label", "Értesítés bezárása");
    }
  }

  try {
    sessionStorage.removeItem("operon-pencil-banner-dismissed");
  } catch (_) {}

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  window.addEventListener("load", bind);
})();
