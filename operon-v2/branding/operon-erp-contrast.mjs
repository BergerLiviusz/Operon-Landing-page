/** Sui AI “challenge / solution” layout — Operon ERP differentiation (light mode). */

import { buildOperonEfficiencyChartHtml } from "./operon-efficiency-chart.mjs";

function trustBlock(title, body) {
  return `<div class="w-layout-hflex ai-trust_content-block operon-contrast-trust__block"><div class="w-layout-hflex gap-10 hy-center"><div class="block-12 bg-primary-blue not-shrink operon-contrast-trust__mark"></div><h4 class="h4-18px operon-contrast-trust__block-title">${title}</h4></div><div class="mw-550"><p class="ts-16px operon-contrast-trust__block-text">${body}</p></div></div>`;
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
    ),
    trustBlock(
      "Lassú bevezetés",
      "Hónapokig tartó telepítés, testreszabás és képzés, mielőtt értéket adna.",
    ),
    trustBlock(
      "Rejtett költségek",
      "Modulonkénti díjak, fejlesztői órák és váratlan frissítések emésztik a költségvetést.",
    ),
    trustBlock(
      "Skálázási korlátok",
      "A növekedéshez új licencek, integrációk és folyamatbeli kompromisszumok kellenek.",
    ),
    trustBlock(
      "Nincs magyar fókusz",
      "Külföldi ERP-k nem ismerik a NAV-ot, a helyi szabályozást és a magyar kkv-k ritmusát.",
    ),
  ].join("");

  const solutionBlocks = [
    trustBlock(
      "Valós idejű adatszinkron",
      "Egyetlen adatmodell minden modulban — azonnal naprakész riportok és döntések.",
    ),
    trustBlock(
      "Moduláris felépítés",
      "Pénzügytől a HR-ig: csak azt aktiválja, amire a vállalatnak szüksége van.",
    ),
    trustBlock(
      "Skálázható infrastruktúra",
      "Felhőalapon növekszik a vállalattal, kiszámítható költségekkel.",
    ),
    trustBlock(
      "Átlátható működés",
      "Ismerős felület, ellenőrizhető folyamatok — bizalommal vezényelheti a csapatot.",
    ),
    trustBlock(
      "Magyar kkv-kra szabva",
      "NAV-kompatibilis folyamatok, helyi támogatás és gyors indulás kompromisszumok nélkül.",
    ),
  ].join("");

  const contrastSections = `<section class="operon-contrast-hero" id="operon-contrast" data-operon-erp-contrast aria-hidden="true"><div class="operon-contrast-hero__track"><div class="operon-contrast-hero__wrapper"><div class="operon-contrast-hero__sticky"><div class="operon-contrast-hero__bg" aria-hidden="true"><div class="operon-contrast-hero__dots"></div>${heroBeams()}<div class="operon-contrast-hero__stripes">${heroStripes()}</div></div>${heroEdgeFades()}</div></div></div></section><section class="operon-contrast-trust" data-operon-erp-contrast><div class="padding-global"><div class="w-layout-blockcontainer container-1400 w-container"><div class="w-layout-vflex operon-contrast-trust__layout ai-trust-layout"><div class="w-layout-vflex operon-contrast-trust__heading-wrap ai-trust_heading-wrapper"><h2 class="operon-contrast-trust__section-title custom-h2_block" global="revealElements"><span class="operon-contrast-trust__section-line">Az Operon</span> <span class="operon-contrast-trust__accent-word">másképp</span> <span class="operon-contrast-trust__section-line">csinálja</span></h2></div><div class="w-layout-vflex operon-contrast-trust__content-wrap ai-trust_content-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" global="dotsReveal" class="dottedhorizontal nopadding hidemob fullwidth operon-contrast-trust__top-rule" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 8" vector-effect="non-scaling-stroke"></path></svg><div global="revealColums" class="w-layout-grid ai-trust_grid operon-contrast-trust__grid">${trustColumn("A KIHÍVÁS", "A hagyományos ERP nem követi le a vállalatot", "A legtöbb rendszer szétszórt adatokon, lassú bevezetésen és rejtett költségeken múlik.", challengeBlocks)}${trustColumn("A MEGOLDÁS", "Az Operon egy platformon egyesít mindent", "Integrált ERP-ökoszisztéma magyar kkv-knak — modulárisan, skálázhatóan, átláthatóan.", solutionBlocks)}</div></div></div></div></div></section>`;

  return `${contrastSections}${buildOperonEfficiencyChartHtml()}`;
}
