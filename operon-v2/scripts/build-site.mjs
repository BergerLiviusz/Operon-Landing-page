#!/usr/bin/env node
/**
 * Clones ZipIt Sui exports into operon-v2/site/ with technical + Operon patches.
 * Sources (preferred):
 *   - operon-v2/sources/sui-sample-template-operon       → site/
 *   - operon-v2/sources/sui-sanoke-template-operon-page2 → site/developers/
 */
import { cp, mkdir, readFile, writeFile, rm, access, readdir } from "node:fs/promises";
import { join, resolve, extname } from "node:path";
import { buildOperonModulesShowcaseHtml } from "../branding/operon-modules-showcase.mjs";
import { buildOperonErpContrastHtml } from "../branding/operon-erp-contrast.mjs";

const V2 = resolve(import.meta.dirname, "..");
const BRANDING = join(V2, "branding");
const OUT = join(V2, "site");
const BUILD_ASSET_VERSION = String(Date.now());
const CUSTOM_DOMAIN = "www.operonworks.hu";

async function resolvePublicDir() {
  if (await exists(join(BRANDING, "operon_favico.svg"))) return BRANDING;
  return join(V2, "..", "public");
}

async function writeDeployArtifacts() {
  await writeFile(join(OUT, ".nojekyll"), "");
  const cnamePath = join(BRANDING, "CNAME");
  if (await exists(cnamePath)) {
    await cp(cnamePath, join(OUT, "CNAME"));
  } else {
    await writeFile(join(OUT, "CNAME"), `${CUSTOM_DOMAIN}\n`);
  }
}

function operonAsset(path) {
  return `${path}?v=${BUILD_ASSET_VERSION}`;
}

async function resolveSourcePaths() {
  const candidates = [
    {
      home: join(V2, "sources/sui-sample-template-operon"),
      dev: join(V2, "sources/sui-sanoke-template-operon-page2"),
    },
    {
      home: join(V2, "..", "sui-sample-template-operon"),
      dev: join(V2, "..", "sui-sanoke-template-operon-page2"),
    },
  ];
  for (const c of candidates) {
    if ((await exists(c.home)) && (await exists(c.dev))) return c;
  }
  throw new Error(
    "Missing Sui ZipIt source folders. Expected sources/sui-sample-template-operon + sources/sui-sanoke-template-operon-page2 (or repo-root siblings).",
  );
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function replaceAll(html, pairs) {
  let out = html;
  const sorted = [...pairs].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) out = out.split(from).join(to);
  return out;
}

const OPERON_PALETTE = [
  ["#298DFF", "#49FDB2"],
  ["#298dff", "#49fdb2"],
  ["#288CFF", "#49fdb2"],
  ["#8FCBFF", "#49fdb2"],
  ["#0082f3", "#49fdb2"],
  ["rgb(41, 141, 255)", "rgb(73, 253, 178)"],
  ["rgb(41,141,255)", "rgb(73, 253, 178)"],
  ["rgba(41, 141, 255", "rgba(73, 253, 178"],
  ["rgba(41,141,255", "rgba(73, 253, 178"],
  ["#CBDEFF", "rgba(73, 253, 178, 0.28)"],
];

function patchLightSurfaces(text) {
  return text
    .replace(/background-color:\s*#ffffff\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#fff\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:#ffffff\b/gi, "background-color:#f6f2f0")
    .replace(/background-color:#fff\b/gi, "background-color:#f6f2f0")
    .replace(/background-color:\s*#f4f5f7\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:#f4f5f7\b/gi, "background-color:#f6f2f0")
    .replace(/background-color:\s*#f7f7f7\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#efefef\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#ebeef0\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#e0e2e6\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#fafafa\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#f3f3f3\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:\s*#efeae7\b/gi, "background-color: #f6f2f0")
    .replace(/background-color:#efeae7\b/gi, "background-color:#f6f2f0")
    .replace(/border:1px #e0e2e6/gi, "border:1px solid transparent")
    .replace(/border:1px solid #e0e2e6/gi, "border:1px solid transparent")
    .replace(/border-bottom:1px solid #e0e2e6/gi, "border-bottom:1px solid transparent")
    .replace(/border-top:1px solid #e0e2e6/gi, "border-top:1px solid transparent")
    .replace(/(?<![a-z-])background:\s*white\b/gi, "background: #f6f2f0");
}

async function patchPaletteInTree(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await patchPaletteInTree(path);
      continue;
    }
    const ext = extname(entry.name).toLowerCase();
    if (![".html", ".css", ".js"].includes(ext)) continue;
    if (entry.name.startsWith("operon-modules-showcase.")) continue;
    if (entry.name.startsWith("operon-erp-contrast.")) continue;
    if (entry.name.startsWith("operon-efficiency-chart.")) continue;

    let text = await readFile(path, "utf8");
    const original = text;
    for (const [from, to] of OPERON_PALETTE) {
      text = text.split(from).join(to);
    }
    if (ext === ".html" || ext === ".css") {
      text = patchLightSurfaces(text);
    }
    if (text !== original) await writeFile(path, text);
  }
}

async function patchDesignTokens(siteRoot) {
  for (const rel of ["css/design_tokens.css", "developers/css/design_tokens.css"]) {
    const path = join(siteRoot, rel);
    if (!(await exists(path))) continue;
    let css = await readFile(path, "utf8");
    css = css
      .replace("--color-3: #298DFF", "--color-3: #49FDB2")
      .replace("--color-18: #8FCBFF", "--color-18: #49FDB2")
      .replace("--color-19: #288CFF", "--color-19: #49fdb2")
      .replace("--color-20: #CBDEFF", "--color-20: rgba(73, 253, 178, 0.28)")
      .replace("--color-5: #131518", "--color-5: #460C39")
      .replace("--color-4: #FFFFFF", "--color-4: #F6F2F0")
      .replace("--color-10: #D9D9D9", "--color-10: #E3DBD7")
      .replace("--color-16: #EFEFEF", "--color-16: #F6F2F0")
      .replace("--color-24: #EBEEF0", "--color-24: #F6F2F0");
    await writeFile(path, css);
  }

  for (const rel of ["css/sui-v2-shared-min.css", "developers/css/sui-v2-shared-min.css"]) {
    const path = join(siteRoot, rel);
    if (!(await exists(path))) continue;
    let css = await readFile(path, "utf8");
    css = patchLightSurfaces(css)
      .replace("--color--grey-50:#f4f5f7", "--color--grey-50:#f6f2f0")
      .replace("--color--grey-100:#e0e2e6", "--color--grey-100:#f6f2f0")
      .replace("--color--grey-100:#e0e2e6", "--color--grey-100:#e3dbd7")
      .replace("--color--grey-200:#c2c6cd", "--color--grey-200:#d4cac5")
      .replace("--color--cultured:#f7f7f7", "--color--cultured:#f6f2f0");
    await writeFile(path, css);
  }
}

const BANNER_RE =
  /<div nav-banner="" class="w-layout-hflex pencil_layout"[^>]*>[\s\S]*?<\/svg><\/div>/;

/** Move pencil banner inside container-1400 so it shares the nav bar width exactly. */
function harmonizePencilBanner(html) {
  const match = html.match(BANNER_RE);
  if (!match) return html;

  const banner = match[0];
  let out = html.replace(BANNER_RE, "");

  const anchors = [
    /<div class="padding-global mob_no-padd"><div nav-overflow-target="" class="container-1400 w-container">/,
    /<div class="padding-global mob_no-padd devnav"><div class="container-1400 w-container">/,
  ];

  for (const anchor of anchors) {
    if (anchor.test(out)) {
      return out.replace(anchor, (m) => `${m}${banner}`);
    }
  }

  return html;
}

/** Point pencil banner CTA at the demo section instead of external Sui blog. */
function patchPencilBannerLink(html) {
  return html.replace(
    /<a data-nav-link="" data-banner="" href="[^"]*"(?: target="_blank")?/g,
    '<a data-nav-link="" data-banner="" href="#demo"',
  );
}

const CANVAS_PIN_RE =
  /<div id="canvasPin" class="canvas-wrapper"[^>]*>\s*<canvas class="canvas_sequence"[^>]*><\/canvas>\s*<\/div>/;

/** Drop the pinned WebGL frame sequence; modules timeline follows directly. */
function removeCanvasSequence(html) {
  return html.replace(CANVAS_PIN_RE, "");
}

const SUI_LOGO_STICKY_RE =
  /<div class="sticky_overlap home-page">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>(?=\s*<section class="(?:operon-contrast-hero|home-benefits)")/;

/** Remove Sui "Move on Sui" masked logo parallax block between modules and benefits. */
function removeSuiLogoSection(html) {
  return html.replace(SUI_LOGO_STICKY_RE, "");
}

const HOME_BENEFITS_RE = /<section class="home-benefits">[\s\S]*?<\/section>/;

/** Replace legacy two-column benefits with Sui AI-style contrast section. */
function replaceHomeBenefitsWithContrast(html) {
  return html.replace(HOME_BENEFITS_RE, buildOperonErpContrastHtml());
}

const HOME_INDUSTRY_RE = /<section class="home-industry">[\s\S]*?<\/section>/;
const HOME_KAPCSOLATBAN_RE = /<section class="home-kapcsolatban">[\s\S]*?<\/section>/;

/** Remove legacy Sui industry grid + contact CTA blocks below ERP contrast. */
function removeHomeIndustrySections(html) {
  return html.replace(HOME_INDUSTRY_RE, "").replace(HOME_KAPCSOLATBAN_RE, "");
}

/** Replace Rive timeline with Sui developers-style feature showcase. */
function replaceModulesTimeline(html) {
  let out = removeCanvasSequence(html);
  out = out.replace(
    /<div scrollto-lenis="">/,
    '<div scrollto-lenis="" id="modules" class="operon-modules-section">',
  );
  out = out.replace(
    /<div inner-addon="" class="padding-large" style="transform: translate3d\(0px, 0px, 0px\);">/,
    '<div inner-addon="" class="padding-large operon-modules-padding">',
  );
  out = out.replace(
    /<div class="timeline_wrapper">[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/div>\s*<\/div>\s*<div class="sticky_overlap)/,
    buildOperonModulesShowcaseHtml(),
  );
  return out;
}

const INNER_FIXED_LOAD_RE =
  /<div inner-fixed-load="" class="hero_overlay"[\s\S]*?<canvas id="noise"[^>]*><\/canvas><\/div>/;

const HERO_SECTION_RE = /<section class="hero-section[^"]*">[\s\S]*?<\/section>/;

function buildOperonAsciiHeroHtml() {
  return `<section class="hero-section operon-ascii-hero" data-hero aria-label="Operon ERP bemutató"><div class="operon-hero-swirl" aria-hidden="true"><canvas></canvas></div><div class="operon-ascii-content"><div class="operon-ascii-copy"><img src="images/Operon_Logo_symbol.svg" alt="" class="operon-ascii-logo" decoding="async"><h1>Vállalatirányítás egyszerűen</h1><p class="operon-ascii-kicker">Integrált vállalkozás kezelési platform, Magyar kis- és középvállalkozásokra szabva.</p><div class="operon-ascii-actions"><div class="cta-wrapper width_auto"><a global="textStagger" href="#modules" class="cta-button"><span global-target="" data-weglot-text="Modulok" aria-label="Modulok">Modulok</span></a><a global="textStagger" href="#demo" class="cta-button is--alternative"><span global-target="" data-weglot-text="Lépjen kapcsolatba" aria-label="Lépjen kapcsolatba">Lépjen kapcsolatba</span></a></div></div></div></div></section>`;
}

/** Strip Sui intro hero and inject Operon ASCII hero (swirl shader + technical layout). */
function replaceHeroWithAsciiHero(html) {
  let out = html.replace(INNER_FIXED_LOAD_RE, "");
  out = out.replace(/<div class="blue_overlay z_index10"><\/div>/, "");
  out = out.replace(HERO_SECTION_RE, buildOperonAsciiHeroHtml());
  out = out.replace(/\.first_section_content_2\s*\{\s*opacity:\s*0;\s*\}/g, "");
  out = out.replace(/\.cta-wrapper\s*\{\s*opacity:\s*0;\s*\}/g, "");
  out = out.replace(/\.navbar\s*\{\s*transform:\s*translateY\(-150%\);\s*\}/g, "");
  return out;
}

async function patchGlobalHandlersBundle(jsPath) {
  let js = await readFile(jsPath, "utf8");
  let changed = false;

  if (!js.includes("function initNavbarReveal(){return;")) {
    js = js.replace(/function initNavbarReveal\(\)\{/, "function initNavbarReveal(){return;");
    changed = true;
  }

  const scrambleOnce =
    'else{const t=e.closest("[global-parent]")||e;e._scrollTrigger=ScrollTrigger.create({trigger:t,start:_isMobile?"top bottom-=30%":"top bottom-=10%",onEnter:i,once:!0})}';
  const scrambleRepeat =
    'else{const t=e.closest("[global-parent]")||e,n=!!e.closest(".home-selection");e._scrollTrigger=ScrollTrigger.create({trigger:t,start:_isMobile?"top bottom-=30%":"top bottom-=10%",onEnter:i,onEnterBack:n?i:void 0,once:!n})}';

  if (js.includes(scrambleOnce)) {
    js = js.replace(scrambleOnce, scrambleRepeat);
    changed = true;
  }

  if (changed) {
    await writeFile(jsPath, js);
  }
}

async function patchHomeBundle50689(jsPath) {
  let js = await readFile(jsPath, "utf8");

  js = js.replace(
    "function _onLoadFinished(){initImageSequencePlayer(),__initHeroBlur(),__initScrollTrigger(),__initTimelineAnimation(),isMobile||initRubberBandScroll()}",
    "function _onLoadFinished(){__initTimelineAnimation(),isMobile||initRubberBandScroll()}",
  );

  js = js.replace(
    /function initIntro\(\)\{[\s\S]*?\}function __initHeroBlur/,
    'function initIntro(){document.querySelector(".navbar")&&gsap.set(".navbar",{display:"block",y:"0%"});const e=document.querySelector("[home-trigger]");e&&gsap.set(e,{zIndex:1}),_onLoadFinished(),lenis&&lenis.start()}function __initHeroBlur',
  );

  js = js.replace(
    'gsap.set(timelineHeading,{opacity:0}),gsap.set(timelineLeft,{y:"30%"}),gsap.set(".timeline_progress_main",{opacity:0});',
    'timelineHeading&&gsap.set(timelineHeading,{opacity:1,y:"0%",scale:1}),timelineLeft.length&&gsap.set(timelineLeft,{y:"0%",opacity:1}),gsap.set(".timeline_progress_main",{opacity:1}),gsap.set(".timeline_progress",{opacity:1});',
  );

  await writeFile(jsPath, js);
}

function patchRemoveCdnSlaterLoader(html) {
  // Sui HTML loads local js/17378.js AND a second CDN copy that re-imports
  // unpatched 50007/50689 bundles (original #298DFF scramble/shuffle colors).
  return html.replace(
    /\s*\(function\(\)\s*\{\s*var src = window\.location\.host\.includes\("webflow\.io"\)\s*\?[\s\S]*?document\.head\.appendChild\(s\);\s*\}\)\(\);/g,
    "",
  );
}

function patchOperonFavicon(html, page) {
  const iconPath = page === "developers" ? "../images/operon_favico.svg" : "images/operon_favico.svg";
  const faviconTags =
    `<link href="${iconPath}" rel="icon" type="image/svg+xml">` +
    `<link href="${iconPath}" rel="shortcut icon" type="image/svg+xml">` +
    `<link href="${iconPath}" rel="apple-touch-icon">`;
  return html
    .replace(/<link href="[^"]*" rel="shortcut icon"[^>]*>/g, "")
    .replace(/<link href="[^"]*" rel="apple-touch-icon"[^>]*>/g, "")
    .replace(/<link href="[^"]*" rel="icon"[^>]*>/g, "")
    .replace("</title>", `</title>${faviconTags}`);
}

function patchHtmlTechnical(html, page) {
  let out = html;
  out = patchRemoveCdnSlaterLoader(out);
  out = patchOperonFavicon(out, page);
  out = out.replace(/\s+integrity="[^"]*"/g, "");
  out = out.replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, "");
  out = out.replace(/<script async="" src="js\/gtm\.js"><\/script>/g, "");

  const brandCss = `<link href="${operonAsset("css/operon-brand.css")}" rel="stylesheet" type="text/css">`;
  out = out.replace(
    /(<link href="css\/sui-v2-shared-min\.css"[^>]*>)/,
    `$1${brandCss}`,
  );

  if (page === "home") {
    const asciiCss = `<link href="${operonAsset("css/operon-ascii-hero.css")}" rel="stylesheet" type="text/css">`;
    const modulesCss =
      `<link href="${operonAsset("css/operon-modules-showcase.css")}" rel="stylesheet" type="text/css">`;
    const contrastCss =
      `<link href="${operonAsset("css/operon-erp-contrast.css")}" rel="stylesheet" type="text/css">`;
    const efficiencyCss =
      `<link href="${operonAsset("css/operon-efficiency-chart.css")}" rel="stylesheet" type="text/css">`;
    out = out.replace(
      /(<link href="css\/operon-brand\.css(?:\?[^"]*)?"[^>]*>)/,
      `$1${asciiCss}${modulesCss}${contrastCss}${efficiencyCss}`,
    );
  }

  const navBannerJs = '<script src="js/operon-nav-banner.js" defer></script>';
  if (!out.includes("operon-nav-banner.js")) {
    out = out.replace("</body>", `${navBannerJs}\n</body>`);
  }

  const navIconsJs = '<script src="js/operon-navbar-icons.js" defer></script>';
  if (!out.includes("operon-navbar-icons.js")) {
    out = out.replace("</body>", `${navIconsJs}\n</body>`);
  }

  if (page === "home") {
    const asciiJs = '<script src="js/operon-hero-swirl.js" defer></script>';
    if (!out.includes("operon-hero-swirl.js")) {
      out = out.replace("</body>", `${asciiJs}\n</body>`);
    }
    const modulesJs = '<script src="js/operon-modules-showcase.js" defer></script>';
    if (!out.includes("operon-modules-showcase.js")) {
      out = out.replace("</body>", `${modulesJs}\n</body>`);
    }
    const contrastJs = '<script src="js/operon-erp-contrast.js" defer></script>';
    if (!out.includes("operon-erp-contrast.js")) {
      out = out.replace("</body>", `${contrastJs}\n</body>`);
    }
    const efficiencyJs = '<script src="js/operon-efficiency-chart.js" defer></script>';
    if (!out.includes("operon-efficiency-chart.js")) {
      out = out.replace("</body>", `${efficiencyJs}\n</body>`);
    }
  }

  out = out.replace(/<html([^>]*?)class="/, '<html$1class="operon-v2 ');

  const bundle =
    page === "home"
      ? '<script type="module" src="js/50689.js"></script>'
      : '<script type="module" src="js/54826.js"></script>';
  if (!out.includes("50689.js") && !out.includes("54826.js")) {
    out = out.replace("</body>", `${bundle}\n</body>`);
  }

  return out;
}

const LOGO_SRC = "images/operon-logo.png";

function patchNavbarLogo(html) {
  let out = html;
  out = out.replace(
    /<img loading="lazy" src="images\/images-asset-d9a7\.svg" alt="" class="object-contain full_height sui-logo">/g,
    `<img loading="lazy" src="${LOGO_SRC}" alt="Operon" class="object-contain full_height operon-logo">`,
  );
  out = out.replace(
    /<img loading="lazy" src="images\/images-asset-9atw\.svg" alt="" class="object-contain full_height">/g,
    `<img loading="lazy" src="${LOGO_SRC}" alt="Operon" class="object-contain full_height operon-logo">`,
  );
  out = out.replace(
    /src="https:\/\/cdn\.prod\.website-files\.com\/[^"]*logo-sui\.svg"/g,
    `src="${LOGO_SRC}"`,
  );
  out = out.replace(/\bclass="([^"]*)\bsui-logo\b([^"]*)"/g, 'class="$1operon-logo$2"');
  return out;
}

async function patchSlaterRouter(jsPath, page) {
  let js = await readFile(jsPath, "utf8");
  js = js.replace(/import\("50007\.js"\)/g, 'import("./50007.js")');
  js = js.replace(/import\("50689\.js"\)/g, 'import("./50689.js")');
  js = js.replace(
    /import\("https:\/\/assets\.slater\.app\/slater\/17378\/54826\.js[^"]*"\)/g,
    'import("./54826.js")',
  );

  if (page === "home" && !js.includes("operon-v2-home")) {
    js = js.replace(
      '{const s=[""],t=paths[paths.length-1]',
      '{const s=["","index.html"],t=paths[paths.length-1]',
    );
  }

  await writeFile(jsPath, js);
}

async function main() {
  const { home: HOME_SRC, dev: DEV_SRC } = await resolveSourcePaths();

  if (!(await exists(HOME_SRC)) || !(await exists(DEV_SRC))) {
    throw new Error(
      "Missing Sui ZipIt folders at repo root: sui-sample-template-operon, sui-sanoke-template-operon-page2",
    );
  }

  const content = JSON.parse(await readFile(join(BRANDING, "content.hu.json"), "utf8"));
  const publicDir = await resolvePublicDir();

  console.log("[operon-v2] Cloning Sui exports → operon-v2/site/");

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  await cp(HOME_SRC, OUT, {
    recursive: true,
    filter: (src) =>
      !src.includes("sui_developers___build_next-gen") && !src.endsWith(".DS_Store"),
  });

  await cp(DEV_SRC, join(OUT, "developers"), { recursive: true });

  await cp(join(BRANDING, "operon-brand.css"), join(OUT, "css/operon-brand.css"));
  await cp(join(BRANDING, "operon-brand.css"), join(OUT, "developers/css/operon-brand.css"));
  await cp(join(BRANDING, "operon-nav-banner.js"), join(OUT, "js/operon-nav-banner.js"));
  await cp(join(BRANDING, "operon-nav-banner.js"), join(OUT, "developers/js/operon-nav-banner.js"));
  await cp(join(BRANDING, "operon-navbar-icons.js"), join(OUT, "js/operon-navbar-icons.js"));
  await cp(join(BRANDING, "operon-navbar-icons.js"), join(OUT, "developers/js/operon-navbar-icons.js"));
  await cp(join(BRANDING, "operon-ascii-hero.css"), join(OUT, "css/operon-ascii-hero.css"));
  await cp(join(BRANDING, "operon-hero-swirl.js"), join(OUT, "js/operon-hero-swirl.js"));
  await cp(join(BRANDING, "operon-modules-showcase.css"), join(OUT, "css/operon-modules-showcase.css"));
  await cp(join(BRANDING, "operon-modules-showcase.js"), join(OUT, "js/operon-modules-showcase.js"));
  await cp(join(BRANDING, "operon-erp-contrast.css"), join(OUT, "css/operon-erp-contrast.css"));
  await cp(join(BRANDING, "operon-erp-contrast.js"), join(OUT, "js/operon-erp-contrast.js"));
  await cp(join(BRANDING, "operon-efficiency-chart.css"), join(OUT, "css/operon-efficiency-chart.css"));
  await cp(join(BRANDING, "operon-efficiency-chart.js"), join(OUT, "js/operon-efficiency-chart.js"));
  await cp(join(BRANDING, "operon-logo.png"), join(OUT, "images/operon-logo.png"));
  await cp(join(BRANDING, "operon-logo.png"), join(OUT, "developers/images/operon-logo.png"));
  await cp(join(publicDir, "operon_favico.svg"), join(OUT, "images/operon_favico.svg"));
  await cp(join(publicDir, "operon_favico.svg"), join(OUT, "developers/images/operon_favico.svg"));
  await cp(join(publicDir, "Operon_Logo_symbol.svg"), join(OUT, "images/Operon_Logo_symbol.svg"));

  const allShared = content.shared;

  let homeHtml = await readFile(join(OUT, "index.html"), "utf8");
  homeHtml = replaceAll(homeHtml, content.home);
  homeHtml = replaceAll(homeHtml, allShared);
  homeHtml = patchNavbarLogo(homeHtml);
  homeHtml = harmonizePencilBanner(homeHtml);
  homeHtml = patchPencilBannerLink(homeHtml);
  homeHtml = replaceModulesTimeline(homeHtml);
  homeHtml = removeSuiLogoSection(homeHtml);
  homeHtml = replaceHomeBenefitsWithContrast(homeHtml);
  homeHtml = removeHomeIndustrySections(homeHtml);
  /* Keep original lottieReveal icons in home-selection (Operon CSS recolors tiles). */
  homeHtml = replaceHeroWithAsciiHero(homeHtml);
  homeHtml = patchHtmlTechnical(homeHtml, "home");
  await writeFile(join(OUT, "index.html"), homeHtml);

  let devHtml = await readFile(join(OUT, "developers/index.html"), "utf8");
  devHtml = replaceAll(devHtml, content.developers);
  devHtml = replaceAll(devHtml, allShared);
  devHtml = patchNavbarLogo(devHtml);
  devHtml = harmonizePencilBanner(devHtml);
  devHtml = patchPencilBannerLink(devHtml);
  devHtml = patchHtmlTechnical(devHtml, "developers");
  await writeFile(join(OUT, "developers/index.html"), devHtml);

  await patchSlaterRouter(join(OUT, "js/17378.js"), "home");
  await patchSlaterRouter(join(OUT, "developers/js/17378.js"), "developers");
  await patchHomeBundle50689(join(OUT, "js/50689.js"));

  await patchDesignTokens(OUT);
  await patchPaletteInTree(OUT);
  await patchGlobalHandlersBundle(join(OUT, "js/50007.js"));
  await patchGlobalHandlersBundle(join(OUT, "developers/js/50007.js"));
  await writeDeployArtifacts();

  console.log("[operon-v2] ✓ Site clone ready");
  console.log("  Home:       http://localhost:3002/");
  console.log("  Developers: http://localhost:3002/developers/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
