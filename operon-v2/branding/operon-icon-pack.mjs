/**
 * Operon icon pack — angular stroke icons for light UI surfaces.
 * Used in place of Lottie (CDN + tabs_layout CSS made Lottie unreliable).
 */

export const OPERON_ICONS = {
  apps: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="4" y="4" width="16" height="16"/><path d="M12 8v8M8 12h8"/></svg>`,
  verified: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><circle cx="9" cy="8" r="3"/><path d="M3 19v-1a6 6 0 0 1 6-6h0"/><path d="M15 9l2 2 5-6"/></svg>`,
  network: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="12" cy="6" r="2"/><path d="M8.2 16.5 10.8 8M15.8 16.5 13.2 8"/></svg>`,
  modules: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>`,
  database: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v5c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 10v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5"/></svg>`,
  briefcase: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="3" y="8" width="18" height="12"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 14h18"/></svg>`,
  scale: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M4 20V4"/><path d="M4 20h16"/><path d="M7 17 12 7l5 10"/></svg>`,
  performance: `<svg class="operon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M4 18V6"/><path d="M8 18v-6"/><path d="M12 18V9"/><path d="M16 18v-9"/><path d="M20 18V4"/></svg>`,
};

export const HOME_TAB_ICON_MAP = {
  "Modulárisan építve": "modules",
  "Egységes adatmodell": "database",
  "Vállalatra kész": "briefcase",
  "Skálázható felépítés": "scale",
  "Teljesítmény kompromisszumok nélkül": "performance",
};

export const BLINK_ICON_MAP = {
  "Hatékony működés": "apps",
  "átlátható folyamatok": "verified",
  "adatvezérelt növekedés": "network",
};

export function operonIconTile(iconKey, variant = "plum") {
  const svg = OPERON_ICONS[iconKey];
  if (!svg) return "";
  return `<div class="operon-icon-tile operon-icon-tile--${variant}" aria-hidden="true">${svg}</div>`;
}
