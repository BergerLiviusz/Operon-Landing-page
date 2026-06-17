/** Sui AI “challenge / solution” layout — Operon ERP differentiation (light mode). */

import { buildOperonEfficiencyChartHtml } from "./operon-efficiency-chart.mjs";
import { buildOperonFaqHtml } from "./operon-faq.mjs";

/* --- contextual angular icons (Lucide-style, 18×18 stroke) --- */
const ICONS = {
  scatter:      `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><line x1="18" y1="15" x2="18" y2="21"/><line x1="15" y1="18" x2="21" y2="18"/></svg>`,
  slow:         `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
  hidden_cost:  `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  scale_limit:  `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="15" y2="18"/></svg>`,
  no_hu:        `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="4.22" y1="4.22" x2="19.78" y2="19.78"/></svg>`,
  sync:         `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>`,
  modular:      `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><rect x="2" y="2" width="8" height="8"/><rect x="14" y="2" width="8" height="8"/><rect x="2" y="14" width="8" height="8"/><rect x="14" y="14" width="8" height="8"/></svg>`,
  cloud:        `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  transparent:  `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  hu_focus:     `<svg class="operon-block-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`,
};

function trustBlock(title, body, icon = "") {
  const mark = icon
    ? `<span class="operon-block-icon-wrap" aria-hidden="true">${icon}</span>`
    : `<div class="block-12 bg-primary-blue not-shrink operon-contrast-trust__mark"></div>`;
  return `<div class="w-layout-hflex ai-trust_content-block operon-contrast-trust__block"><div class="w-layout-hflex gap-10 hy-center">${mark}<h4 class="h4-18px operon-contrast-trust__block-title">${title}</h4></div><div class="mw-550"><p class="ts-16px operon-contrast-trust__block-text">${body}</p></div></div>`;
}

function columnDots() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2 1440" fill="none" class="solutions_dots ml--1 left_aligned operon-contrast-trust__vline" aria-hidden="true"><path d="M1 0L1.00003 1440" stroke="currentColor" stroke-width="2" stroke-dasharray="2 10" vector-effect="non-scaling-stroke"></path></svg><svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 2 1440" fill="none" class="solutions_dots ml--1 right_aligned operon-contrast-trust__vline" aria-hidden="true"><path d="M1 0L1.00003 1440" stroke="currentColor" stroke-width="2" stroke-dasharray="2 10" vector-effect="non-scaling-stroke"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" class="solutions_dots ml--1 operon-contrast-trust__hline" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 10" vector-effect="non-scaling-stroke"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" class="solutions_dots ml--1 bottom_aligned operon-contrast-trust__hline" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 10" vector-effect="non-scaling-stroke"></path></svg>`;
}

function trustColumn(eyebrow, heading, lede, blocks) {
  return `<div class="w-layout-vflex ai-trust_grid-item operon-contrast-trust__col"><div class="w-layout-vflex ai-trust_heading-block"><div class="w-layout-vflex gap-40 vx-center"><div global-block-target="" class="w-layout-hflex gap-6 hy-center operon-contrast-trust__eyebrow-wrap"><div class="block-10 bg-primary-blue not-shrink operon-contrast-trust__eyebrow-mark"></div><span class="ts-12px mono operon-contrast-trust__eyebrow">${eyebrow}</span></div><div class="w-layout-vflex gap-24 vx-center"><div class="mw-400"><h3 class="h3-44px text-center mob_32px operon-contrast-trust__col-title">${heading}</h3></div><div class="mw-500"><p class="ts-18px text-center operon-contrast-trust__col-lede">${lede}</p></div></div></div></div><div global-grid-target="" class="w-layout-vflex gap-8 full-width operon-contrast-trust__blocks">${blocks}</div>${columnDots()}</div>`;
}

function heroStripes(count = 8) {
  return Array.from({ length: count }, (_, i) => `<div class="operon-contrast-hero__stripe" style="--stripe-i:${i}"></div>`).join("");
}

function heroBeams() {
  return `<div class="operon-contrast-hero__beams" aria-hidden="true"><div class="operon-contrast-hero__beam operon-contrast-hero__beam--left"></div><div class="operon-contrast-hero__beam operon-contrast-hero__beam--right"></div></div>`;
}

function heroEdgeFades() {
  return `<div class="operon-contrast-hero__edge-fade operon-contrast-hero__edge-fade--top" aria-hidden="true"></div><div class="operon-contrast-hero__edge-fade operon-contrast-hero__edge-fade--bottom" aria-hidden="true"></div>`;
}

export function buildOperonErpContrastHtml() {
  const challengeBlocks = [
    trustBlock(
      "Szétszórt adatok",
      "Több rendszer, több adatbázis — nincs egységes, naprakész kép a vállalatról.",
      ICONS.scatter,
    ),
    trustBlock(
      "Lassú bevezetés",
      "Hónapokig tartó telepítés, testreszabás és képzés, mielőtt értéket adna.",
      ICONS.slow,
    ),
    trustBlock(
      "Rejtett költségek",
      "Modulonkénti díjak, fejlesztői órák és váratlan frissítések emésztik a költségvetést.",
      ICONS.hidden_cost,
    ),
    trustBlock(
      "Skálázási korlátok",
      "A növekedéshez új licencek, integrációk és folyamatbeli kompromisszumok kellenek.",
      ICONS.scale_limit,
    ),
    trustBlock(
      "Magyar nyelv és rendszer szemlélet hiánya",
      "Külföldi ERP-k nem ismerik a NAV-ot, a helyi szabályozást és a magyar kkv-k ritmusát.",
      ICONS.no_hu,
    ),
  ].join("");

  const solutionBlocks = [
    trustBlock(
      "Valós idejű adatszinkron",
      "Egyetlen adatmodell minden modulban — azonnal naprakész riportok és döntések.",
      ICONS.sync,
    ),
    trustBlock(
      "Moduláris felépítés",
      "Pénzügytől a HR-ig: csak azt aktiválja, amire a vállalatnak szüksége van.",
      ICONS.modular,
    ),
    trustBlock(
      "Skálázható infrastruktúra",
      "Felhőalapon növekszik a vállalattal, kiszámítható költségekkel.",
      ICONS.cloud,
    ),
    trustBlock(
      "Átlátható működés",
      "Ismerős felület, ellenőrizhető folyamatok — bizalommal vezényelheti a csapatot.",
      ICONS.transparent,
    ),
    trustBlock(
      "Magyar kkv-kra szabva",
      "NAV-kompatibilis folyamatok, helyi támogatás és gyors indulás kompromisszumok nélkül.",
      ICONS.hu_focus,
    ),
  ].join("");

  const contrastSections = `<section class="operon-contrast-hero" id="operon-contrast" data-operon-erp-contrast aria-hidden="true"><div class="operon-contrast-hero__track"><div class="operon-contrast-hero__wrapper"><div class="operon-contrast-hero__sticky"><div class="operon-contrast-hero__bg" aria-hidden="true"><div class="operon-contrast-hero__dots"></div>${heroBeams()}<div class="operon-contrast-hero__stripes">${heroStripes()}</div></div>${heroEdgeFades()}</div></div></div></section><section class="operon-contrast-trust" id="miert-operon" data-operon-erp-contrast><div class="padding-global"><div class="w-layout-blockcontainer container-1400 w-container"><div class="w-layout-vflex operon-contrast-trust__layout ai-trust-layout"><div class="w-layout-vflex operon-contrast-trust__heading-wrap ai-trust_heading-wrapper"><h2 class="operon-contrast-trust__section-title custom-h2_block" global="revealElements"><span class="operon-contrast-trust__section-line">Az Operon</span> <span class="operon-contrast-trust__accent-word">másképp</span> <span class="operon-contrast-trust__section-line">csinálja</span></h2></div><div class="w-layout-vflex operon-contrast-trust__content-wrap ai-trust_content-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" global="dotsReveal" class="dottedhorizontal nopadding hidemob fullwidth operon-contrast-trust__top-rule" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 8" vector-effect="non-scaling-stroke"></path></svg><div global="revealColums" class="w-layout-grid ai-trust_grid operon-contrast-trust__grid">${trustColumn("A KIHÍVÁS", "A hagyományos ERP nem követi le a vállalatot", "A legtöbb rendszer szétszórt adatokon, lassú bevezetésen és rejtett költségeken alapul.", challengeBlocks)}${trustColumn("A MEGOLDÁS", "Az Operon egy platformon egyesít mindent", "Integrált ERP-ökoszisztéma magyar kkv-knak — modulárisan, skálázhatóan, átláthatóan.", solutionBlocks)}</div></div></div></div></div></section>`;

  return `${contrastSections}${buildOperonEfficiencyChartHtml()}${buildOperonFaqHtml()}`;
}
