/** Lightweight Operon footer — in-page section anchors only. */

const NAV_LINKS = [
  { href: "#modules", label: "Modulok" },
  { href: "#miert-operon", label: "Miért Operon" },
  { href: "#hatékonysag", label: "Hatékonyság" },
  { href: "#faq", label: "GYIK" },
  { href: "#demo", label: "Kapcsolat" },
];

function footerNav() {
  return NAV_LINKS.map(
    ({ href, label }) =>
      `<a href="${href}" class="operon-footer__link">${label}</a>`,
  ).join("");
}

export function buildOperonFooterHtml() {
  const year = new Date().getFullYear();

  return `<div class="scroll_footer"><footer class="footer operon-footer" aria-label="Lábléc"><div class="padding-global"><div class="w-layout-blockcontainer container-1400 w-container"><div class="operon-footer__inner"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" class="operon-footer__rule" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 8" vector-effect="non-scaling-stroke"></path></svg><div class="operon-footer__main"><a href="/" class="operon-footer__brand" aria-label="Operon főoldal"><img src="images/Operon_Logo_symbol.svg" alt="" class="operon-footer__logo" width="48" height="48" decoding="async"><span class="operon-footer__wordmark">operon</span></a><nav class="operon-footer__nav" aria-label="Oldal szekciói">${footerNav()}</nav></div><p class="operon-footer__copy">© ${year} Operon Kft. Minden jog fenntartva.</p></div></div></div></footer>`;
}
