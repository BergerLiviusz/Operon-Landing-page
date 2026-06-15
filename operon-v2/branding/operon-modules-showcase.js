/**
 * Operon modules showcase — developers-page feature cards (light mode).
 */
(function initOperonModulesShowcase() {
  const ROOT_SEL = "[data-operon-modules-showcase]";
  const LOTTIE_SPEED = 2;

  /** Play only the reveal half; full timeline reverses/clears on cards 1–2. */
  const CARD_LOTTIE = {
    "operon-feature-card-1": { endFrame: 31, holdAt: 30 },
    "operon-feature-card-2": { endFrame: 30 },
    "operon-feature-card-3": { endFrame: 31, holdAt: 30 },
  };

  const PLUM_ACCENT = "#460C39";
  const PLUM_LIGHT = "#B889A8";

  const MINT_BRIGHT = "#49FDB2";
  const MINT_LIGHT = "#7dffd0";
  const MINT_DARK = "#1FA87A";

  const CARD_PALETTES = {
    "operon-feature-card-1": {
      primary: PLUM_ACCENT,
      secondary: PLUM_LIGHT,
      tertiary: PLUM_ACCENT,
    },
    "operon-feature-card-2": {
      primary: MINT_BRIGHT,
      secondary: MINT_LIGHT,
      tertiary: MINT_DARK,
    },
    "operon-feature-card-3": {
      primary: MINT_LIGHT,
      secondary: PLUM_ACCENT,
      tertiary: PLUM_ACCENT,
    },
  };

  function buildColorMap(palette) {
    const { primary, secondary, tertiary } = palette;
    return new Map([
      ["rgb(41,141,255)", primary],
      ["rgb(41, 141, 255)", primary],
      ["rgb(40,140,255)", tertiary],
      ["rgb(40, 140, 255)", tertiary],
      ["rgb(143,203,255)", secondary],
      ["rgb(143, 203, 255)", secondary],
      ["rgb(255,255,255)", tertiary],
      ["rgb(255, 255, 255)", tertiary],
      ["#298DFF", primary],
      ["#298dff", primary],
      ["#288CFF", tertiary],
      ["#288cff", tertiary],
      ["#8FCBFF", secondary],
      ["#8fcbff", secondary],
      ["#49FDB2", primary],
      ["#49fdb2", primary],
      ["#7dffd0", secondary],
      ["#1FA87A", tertiary],
      ["#1fa87a", tertiary],
      ["#460C39", primary],
      ["#460c39", primary],
      ["#B889A8", secondary],
      ["#b889a8", secondary],
      ["rgb(212,212,212)", secondary],
      ["rgb(43,43,43)", tertiary],
      ["rgb(42,42,42)", tertiary],
    ]);
  }

  function getCardId(el) {
    return el.closest(".feature-card")?.id || "";
  }

  function mapSvgColor(value, cardId) {
    if (!value || value === "none") return null;
    const palette = CARD_PALETTES[cardId];
    if (!palette) return null;
    const map = buildColorMap(palette);
    const trimmed = value.trim();
    return map.get(trimmed) || map.get(trimmed.replace(/\s+/g, "")) || null;
  }

  function recolorLottieSvg(el) {
    if (!el) return;
    const cardId = getCardId(el);
    el.querySelectorAll("*").forEach((node) => {
      ["fill", "stroke"].forEach((attr) => {
        const mapped = mapSvgColor(node.getAttribute(attr), cardId);
        if (mapped) node.setAttribute(attr, mapped);
      });
      if (!node.style) return;
      ["fill", "stroke"].forEach((prop) => {
        const mapped = mapSvgColor(node.style.getPropertyValue(prop), cardId);
        if (mapped) node.style.setProperty(prop, mapped, "important");
      });
    });
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function isBluePixel(r, g, b, a) {
    return a > 20 && b > 100 && b > r + 20;
  }

  /** Card 3 embeds a blue JPEG — recolor pixels to light mint + plum checkerboard. */
  function recolorLottieImages(el) {
    const cardId = getCardId(el);
    if (cardId !== "operon-feature-card-3") return;

    const plum = hexToRgb(PLUM_ACCENT);
    const mint = hexToRgb(MINT_LIGHT);

    el.querySelectorAll("image").forEach((imgEl) => {
      if (imgEl.dataset.operonImageRecolored === "1") return;

      const href =
        imgEl.getAttribute("href") ||
        imgEl.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      if (!href?.startsWith("data:image")) return;

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(image, 0, 0);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = pixels.data;
        const cell = Math.max(10, Math.round(canvas.width / 14));

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];
            const a = d[i + 3];
            if (!isBluePixel(r, g, b, a)) continue;

            const usePlum = (Math.floor(x / cell) + Math.floor(y / cell)) % 2 === 0;
            const c = usePlum ? plum : mint;
            d[i] = c.r;
            d[i + 1] = c.g;
            d[i + 2] = c.b;
          }
        }

        ctx.putImageData(pixels, 0, 0);
        const newHref = canvas.toDataURL("image/png");
        imgEl.setAttribute("href", newHref);
        imgEl.setAttributeNS("http://www.w3.org/1999/xlink", "href", newHref);
        imgEl.dataset.operonImageRecolored = "1";
      };
      image.src = href;
    });
  }

  function recolorLottieAll(el) {
    recolorLottieSvg(el);
    recolorLottieImages(el);
  }

  function recolorLottieSvgSoon(el) {
    recolorLottieAll(el);
    requestAnimationFrame(() => {
      recolorLottieAll(el);
      requestAnimationFrame(() => recolorLottieAll(el));
    });
  }

  function holdFrame(anim, frame) {
    if (!anim) return;
    const max = Math.max(0, Math.floor(anim.totalFrames) - 1);
    anim.goToAndStop(Math.min(frame, max), true);
  }

  function loadLottie(el) {
    if (!el || el.dataset.operonLottieReady === "1") return;
    const src = el.getAttribute("data-src");
    if (!src || typeof window.lottie === "undefined") return;

    el.dataset.operonLottieReady = "1";
    el.innerHTML = "";

    const anim = window.lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: src,
    });
    anim.setSpeed(LOTTIE_SPEED);
    el._operonLottie = anim;

    const onFrame = () => recolorLottieSvgSoon(el);
    anim.addEventListener("DOMLoaded", () => {
      recolorLottieSvgSoon(el);
      holdFrame(anim, 0);
    });
    anim.addEventListener("enterFrame", onFrame);
    anim.addEventListener("complete", onFrame);
  }

  function snapToHold(el, anim, holdAt) {
    if (el._operonHoldHandler) {
      anim.removeEventListener("enterFrame", el._operonHoldHandler);
      el._operonHoldHandler = null;
    }
    if (el._operonCompleteHandler) {
      anim.removeEventListener("complete", el._operonCompleteHandler);
      el._operonCompleteHandler = null;
    }
    anim.pause();
    holdFrame(anim, holdAt);
    recolorLottieSvgSoon(el);
  }

  function resetLottie(el) {
    if (!el) return;
    const anim = el._operonLottie;
    if (!anim) return;

    if (el._operonHoldHandler) {
      anim.removeEventListener("enterFrame", el._operonHoldHandler);
      el._operonHoldHandler = null;
    }

    if (el._operonCompleteHandler) {
      anim.removeEventListener("complete", el._operonCompleteHandler);
      el._operonCompleteHandler = null;
    }

    anim.stop();
    holdFrame(anim, 0);
  }

  function playLottie(el, cardId) {
    if (!el) return;
    loadLottie(el);

    const anim = el._operonLottie;
    if (!anim) return;

    const cfg = CARD_LOTTIE[cardId] || { endFrame: Math.floor(anim.totalFrames) - 1 };
    const endFrame = cfg.endFrame;
    const holdAt = cfg.holdAt ?? endFrame;

    const snapHold = () => snapToHold(el, anim, holdAt);

    if (el._operonHoldHandler) {
      anim.removeEventListener("enterFrame", el._operonHoldHandler);
    }
    el._operonHoldHandler = () => {
      if (anim.currentFrame >= holdAt) snapHold();
    };
    anim.addEventListener("enterFrame", el._operonHoldHandler);

    if (el._operonCompleteHandler) {
      anim.removeEventListener("complete", el._operonCompleteHandler);
    }
    el._operonCompleteHandler = snapHold;
    anim.addEventListener("complete", el._operonCompleteHandler);

    anim.goToAndStop(0, true);
    anim.setSpeed(LOTTIE_SPEED);
    anim.playSegments([0, endFrame], true);
  }

  function bindFeatureCards(root) {
    const wrapper = root.querySelector(".features-cards-wrapper");
    if (!wrapper || wrapper.dataset.operonCardsBound === "1") return;
    if (typeof window.lottie === "undefined") return;

    wrapper.dataset.operonCardsBound = "1";
    const cards = [...wrapper.querySelectorAll(".feature-card")];

    const DEFAULT_ACTIVE_ID = "operon-feature-card-3";

    function deactivate(card) {
      if (!card) return;
      card.classList.remove("is--active", "is--animating");
      resetLottie(card.querySelector(".feature-lottie"));
    }

    function setDefaultLayout() {
      cards.forEach((c) => deactivate(c));
      const defaultCard =
        wrapper.querySelector(`#${DEFAULT_ACTIVE_ID}`) || cards[cards.length - 1];
      if (defaultCard) defaultCard.classList.add("is--active");
    }

    function activate(card) {
      if (!card) return;
      cards.forEach((c) => {
        if (c !== card) deactivate(c);
      });
      card.classList.add("is--active", "is--animating");

      const lottie = card.querySelector(".feature-lottie");
      if (lottie) playLottie(lottie, card.id);
    }

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => activate(card));
      card.addEventListener("focusin", () => activate(card));
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      loadLottie(card.querySelector(".feature-lottie"));
    });

    cards.forEach((card) => {
      if (!card.classList.contains("is--active")) {
        resetLottie(card.querySelector(".feature-lottie"));
      }
    });

    setDefaultLayout();

    if (window.innerWidth <= 479 && window.gsap && window.ScrollTrigger) {
      const triggers = wrapper.querySelectorAll(".feature-card-trigger");
      triggers.forEach((trigger, i) => {
        window.ScrollTrigger.create({
          trigger,
          start: "top center",
          onEnter: () => activate(cards[i]),
          onEnterBack: () => activate(cards[i]),
        });
      });
    }
  }

  function init() {
    const root = document.querySelector(ROOT_SEL);
    if (!root) return;
    bindFeatureCards(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", init);
})();
