/** Sui payments “Stablecoins” chart block — Operon SMB efficiency growth. */

const BAR_COUNT = 13;
const GROWTH_START = 18;
const GROWTH_END = 97;
const GROWTH_CURVE = 3.15;

const X_LABELS = ["Indulás", "2. hó", "4. hó", "6. hó", "8. hó", "10. hó", "12. hó"];

function buildExponentialPoints(count, start, end, curve) {
  const denom = Math.exp(curve) - 1;
  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    const curved = (Math.exp(curve * t) - 1) / denom;
    return Math.round(start + (end - start) * curved);
  });
}

const EFFICIENCY_POINTS = buildExponentialPoints(
  BAR_COUNT,
  GROWTH_START,
  GROWTH_END,
  GROWTH_CURVE,
);

function chartBars() {
  return EFFICIENCY_POINTS.map((value, index) => {
    const height = (value / 100) * 9.5;
    return `<div class="operon-efficiency-chart__bar" data-graph="${index + 1}" data-value="${value}" style="--bar-height:${height}em" role="img" aria-label="${value}% hatékonyság"></div>`;
  }).join("");
}

function chartGridLines() {
  return Array.from({ length: 5 }, () => `<div class="operon-efficiency-chart__gridline"></div>`).join("");
}

function benefitRow(text) {
  return `<div class="operon-efficiency-chart__benefit"><div class="operon-efficiency-chart__cube"></div><span class="operon-efficiency-chart__benefit-text">${text}</span></div>`;
}

export function buildOperonEfficiencyChartHtml() {
  const benefits = [
    "Gyorsabb számlázás és könyvelési zárás",
    "Kevesebb manuális adatbevitel a csapatok között",
    "Egy helyen látható készlet, pénzügy és értékesítés",
    "Riportok naprakészen, döntésre kész formában",
    "Skálázható folyamatok növekedés közben",
  ]
    .map(benefitRow)
    .join("");

  const xLabels = X_LABELS.map(
    (label) => `<span class="operon-efficiency-chart__xlabel">${label}</span>`,
  ).join("");

  return `<section class="operon-efficiency-chart" id="hatékonysag" data-operon-efficiency-chart aria-labelledby="operon-efficiency-chart-title"><div class="padding-global"><div class="w-layout-blockcontainer container-1400 w-container"><div class="operon-efficiency-chart__layout"><div class="operon-efficiency-chart__intro"><span class="operon-efficiency-chart__eyebrow">Hatékonyság</span><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" global="dotsReveal" class="dottedhorizontal nopadding operon-efficiency-chart__top-rule" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 8" vector-effect="non-scaling-stroke"></path></svg></div><div class="operon-efficiency-chart__grid"><div class="operon-efficiency-chart__chart-col"><span class="operon-efficiency-chart__ylabel">Hatékonysági index (%)</span><div class="operon-efficiency-chart__chart-wrap"><span class="operon-efficiency-chart__chart-kicker">Operon bevezetése után</span><div class="operon-efficiency-chart__chart-body"><div class="operon-efficiency-chart__yaxis" aria-hidden="true"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div class="operon-efficiency-chart__plot"><div class="operon-efficiency-chart__gridlines">${chartGridLines()}</div><div class="operon-efficiency-chart__bars">${chartBars()}</div><div class="operon-efficiency-chart__cursor-line" aria-hidden="true"></div></div></div><div class="operon-efficiency-chart__xaxis">${xLabels}</div></div></div><div class="operon-efficiency-chart__copy-col"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2 1440" fill="none" class="solutions_dots ml--1 left_aligned operon-efficiency-chart__vline" aria-hidden="true"><path d="M1 0L1.00003 1440" stroke="currentColor" stroke-width="2" stroke-dasharray="2 10" vector-effect="non-scaling-stroke"></path></svg><div class="operon-efficiency-chart__copy"><h2 id="operon-efficiency-chart-title" class="operon-efficiency-chart__title" global="revealElements">Hogyan nőtt a hatékonyság egy kisvállalkozásnál?</h2><p class="operon-efficiency-chart__lede" global="revealElements">Egy magyar kkv az Operon ERP bevezetése után hónapról hónapra mérhetően javította a folyamatok hatékonyságát — kevesebb adminisztráció, gyorsabb döntések.</p><div class="operon-efficiency-chart__benefits" global-grid-target="">${benefits}</div></div></div></div></div></div></div></section>`;
}
