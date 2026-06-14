/** Developers-page feature showcase adapted for Operon ERP modules (home #modules). */

const LOTTIE = {
  card1:
    "https://cdn.prod.website-files.com/68e8e0120513ba12c5cd12e0/6981b2010c984e8de9a75612_developers_circle_.json",
  card2:
    "https://cdn.prod.website-files.com/6914590d04af61066f54b280/6968f2a74c08122ff8295f84_2_desktop%20(2).json",
  card3:
    "https://cdn.prod.website-files.com/6914590d04af61066f54b280/6968f2a881d433e185914526_3_desktop%20(1).json",
};

const HERO_TAB_ICONS = {
  doc: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" class="hero-tab-svg" aria-hidden="true"><path d="M8.64529 3.18359L3.77344 3.18359V13.3341H11.8755L11.8688 6.74388" stroke="currentColor" stroke-width="1.2"/><path d="M11.8755 3.18359V6.74388H8.64529" stroke="currentColor" stroke-width="1.2"/></svg>`,
  start: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" class="hero-tab-svg" aria-hidden="true"><path d="M8 3.52441L12.6641 1.66992V2.98145L8.55957 4.61328V12.7871L12.6973 11.0957V2.99609H13.3359V11.668L8 14.0439L2.66406 11.668V2.99609H3.30273V11.0957L7.44043 12.7871V4.61328L3.33594 2.98145V1.66992L8 3.52441Z" fill="currentColor"/></svg>`,
  tools: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" class="hero-tab-svg" aria-hidden="true"><path d="M14.3438 10.7598L8 15.5254L1.65625 10.7598V9.32812L8 14.0938L14.3438 9.32812V10.7598Z" fill="currentColor"/><path d="M8 1.47461L14.3438 6.24023V7.67188L8 2.90625L1.65625 7.67188V6.24023L8 1.47461Z" fill="currentColor"/></svg>`,
  support: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" class="hero-tab-svg" aria-hidden="true"><path d="M8 1.5C4.96243 1.5 2.5 3.96243 2.5 7V8.5H3.75C4.44036 8.5 5 9.05964 5 9.75V11.75C5 12.4404 4.44036 13 3.75 13H2.5V14.5H13.5V13H12.25C11.5596 13 11 12.4404 11 11.75V9.75C11 9.05964 11.5596 8.5 12.25 8.5H13.5V7C13.5 3.96243 11.0376 1.5 8 1.5Z" stroke="currentColor" stroke-width="1.2"/></svg>`,
  bolt: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" class="hero-tab-svg" aria-hidden="true"><path d="M8.87891 8L11.2852 1.71973L5.7207 8H7.12305L4.71484 14.2832L10.2832 8H8.87891Z" fill="currentColor"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" class="hero-tab-svg" aria-hidden="true"><path d="M2.5 2.5H6.5V6.5H2.5V2.5ZM9.5 2.5H13.5V6.5H9.5V2.5ZM2.5 9.5H6.5V13.5H2.5V9.5ZM9.5 9.5H13.5V13.5H9.5V9.5Z" stroke="currentColor" stroke-width="1.2"/></svg>`,
};

function lottieDiv(src, className = "feature-lottie") {
  return `<div class="${className}" data-animation-type="lottie" data-src="${src}" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-loading="eager"></div>`;
}

function featureCard(id, active, accent, title, subtitle, lottieSrc) {
  const activeClass = active ? " is--active" : "";
  return `<div id="${id}" class="feature-card${activeClass}"><h3 class="feature-card-text"><span class="blue-text">${accent}</span><br>${title}</h3><div class="body-text-1 feature-subtext">${subtitle}</div><div class="feature-card-lottie">${lottieDiv(lottieSrc)}</div></div>`;
}

function heroTab(href, icon, label) {
  return `<a href="${href}" class="hero-tab w-inline-block">${icon}<div>${label}</div></a>`;
}

function featureButtonSvg(pathD) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 40 40" fill="none" class="feature-button-svg" aria-hidden="true"><path d="${pathD}" fill="currentColor"/></svg>`;
}

/** Sui developers-page angular icons (filled 40×40 paths). */
const FEATURE_BUTTON_ICONS = {
  /** Layer stack — Sui “Getting started” (finance / structured records). */
  "is-1": featureButtonSvg(
    "M20.0005 8.81152L31.6616 4.17578V7.4541L21.3989 11.5332V31.9697L31.7437 27.7402V7.48926H34.5483V29.8721L20.0005 35.8203L5.45166 29.8721V7.48926H8.25732V27.7402L18.5942 31.9668V11.5332L8.24951 7.43945V4.16016L20.0005 8.81152Z",
  ),
  /** Four-quadrant grid — inventory / module tiles (Beszerzés és készlet). */
  "is-2": featureButtonSvg(
    "M4 4H18V18H4V4ZM22 4H36V18H22V4ZM4 22H18V36H4V22ZM22 22H36V36H22V22Z",
  ),
};

function moduleButton(href, title, desc, modClass) {
  const icon = FEATURE_BUTTON_ICONS[modClass] || "";
  return `<a href="${href}" class="feature-button-link ${modClass} w-inline-block"><div class="feature-button-top"><h3 class="feature-button-h3-link">${title}</h3><div class="feature-button-corner-icon">${icon}</div></div><div class="feature-button-bottom feature-button-link-bottom"><div class="body-text-1 feature-button-subtext">${desc}</div></div><div class="feature-button-bg"></div></a>`;
}

function moduleTile(id, num, name, stackLabel) {
  return `<article class="operon-mod-tile" id="${id}"><div class="operon-mod-tile_head"><span class="operon-mod-tile_num">${num}</span><span class="operon-mod-tile_name">${name}</span></div><div class="operon-mod-tile_foot"><span class="operon-mod-tile_stack">${stackLabel}</span></div></article>`;
}

export function buildOperonModulesShowcaseHtml() {
  const tabs = [
    heroTab("#operon-mod-penzugy", HERO_TAB_ICONS.doc, "Pénzügy"),
    heroTab("#operon-mod-beszerzes", HERO_TAB_ICONS.tools, "Beszerzés"),
    heroTab("#operon-mod-ertekesites", HERO_TAB_ICONS.start, "Értékesítés"),
    heroTab("#operon-mod-gyartas", HERO_TAB_ICONS.support, "Gyártás"),
    heroTab("#operon-mod-hr", HERO_TAB_ICONS.bolt, "HR"),
    heroTab("#operon-mod-projekt", HERO_TAB_ICONS.grid, "Projekt"),
  ].join("");

  const tiles = [
    moduleTile("operon-mod-penzugy", "01", "Pénzügy és számvitel", "Adattár"),
    moduleTile("operon-mod-beszerzes", "02", "Beszerzés és készlet", "Adattár"),
    moduleTile("operon-mod-ertekesites", "03", "Értékesítés és CRM", "Felhő modul"),
    moduleTile("operon-mod-gyartas", "04", "Gyártás és termelés", "Felhő modul"),
    moduleTile("operon-mod-projekt", "05", "Projektmenedzsment", "Integrációs híd"),
    moduleTile("operon-mod-hr", "06", "HR / emberi erőforrások", "Operon NS"),
  ].join("");

  return `<div class="operon-modules-showcase timeline_wrapper" data-operon-modules-showcase>
<div class="operon-mod-heading">
<h2 class="operon-mod-title">Modulok, összehangolva.</h2>
<div class="operon-mod-kicker"><span class="operon-mod-kicker_mark" aria-hidden="true"></span><span class="operon-mod-kicker_text">Az Operon modulcsalád egy integrált ERP-ökoszisztéma magyar kkv-knak</span></div>
</div>
<div id="operon-feature-pin" class="operon-feature-pin section">
<div class="operon-feature-inner">
<div class="features-content">
<div class="features-cards-wrapper">
${featureCard("operon-feature-card-1", false, "Valós idejű", "adatszinkron", "Egyetlen adatmodell minden modulban — azonnal naprakész riportok és döntések.", LOTTIE.card1)}
${featureCard("operon-feature-card-2", false, "6+ integrált", "ERP-modul", "Pénzügytől az HR-ig egy rendszerben, magyar kis- és középvállalkozásokra optimalizálva.", LOTTIE.card2)}
${featureCard("operon-feature-card-3", true, "1 platform", "minden folyamatra", "Operon = integrált vállalkozáskezelés kompromisszumok nélkül, skálázható felhőalapon.", LOTTIE.card3)}
<div class="feature-card-mob-triggers" aria-hidden="true"><div class="feature-card-trigger"></div><div class="feature-card-trigger is-2"></div><div class="feature-card-trigger"></div></div>
</div>
<div class="features-line" aria-hidden="true"><div class="feature-line-box"></div></div>
<div class="features-butttons-wrapper">
${moduleButton("#operon-mod-penzugy", "Pénzügy és számvitel", "Könyvelés, kontrolling és pénzügyi riportok egy közös adatbázisból — NAV-kompatibilis folyamatokkal.", "is-1")}
<div class="featiure-button_line" aria-hidden="true"></div>
${moduleButton("#operon-mod-beszerzes", "Beszerzés és készlet", "Beszerzési lánc, készletgazdálkodás és raktárkezelés valós idejű láthatósággal.", "is-2")}
</div>
</div>
</div>
</div>
<div class="operon-mod-tabs-screen">
<div class="hero-tabs-wrapper not-hero operon-mod-tabs">${tabs}</div>
</div>
<div class="operon-mod-grid" aria-label="Operon ERP modulok">${tiles}</div>
</div>`;
}
