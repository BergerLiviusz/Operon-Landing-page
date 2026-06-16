const LOTTIE_PRODUCTS =
  "https://cdn.prod.website-files.com/68e8e0120513ba12c5cd12e0/692ea9bc8af3e280effd3c61_00%20-%20Products%2C%20apps.json";
const LOTTIE_TRUST =
  "https://cdn.prod.website-files.com/68e8e0120513ba12c5cd12e0/692ea9bc5b5c145c44a7d59a_00%20-%20Verified%20user%2C%20user-trust.json";
const LOTTIE_SHARED =
  "https://cdn.prod.website-files.com/68e8e0120513ba12c5cd12e0/692ea9bc5f8c97ae78984db4_01%20-%20Sharing%2C%20Shared%20value.json";

function trustHighlightRow(label, lottieSrc, { charspace = false } = {}) {
  const charAttr = charspace ? ' global-highlight-charspace=""' : ' global-highlight-char=""';
  return `<div class="operon-trust-highlight-row"><div class="blinkexpander operon-trust-highlight"><div class="custom-span custom no_margin"><div class="icon_expander no_padding"><div global="lottieReveal" global-src="${lottieSrc}" class="mw-78 background-blue"></div></div><div global-highlight="" class="higlight_wrapper"><span${charAttr} class="custom-span invert no-margin">${label}</span></div></div></div></div>`;
}

/** Home trust / blink section — stacked rows with Sui highlight + Lottie scroll hooks. */
export function buildHomeTrustBlinkHtml() {
  return `<span class="gray_span">Teljes vállalati működés, egy rendszerben</span><div global="initHighlight" class="reveal-lines operon-trust-reveal"><span class="custom-span block operon-trust-lead">Az Operon azért jött létre, hogy a Magyar kis- és középvállalatok munkafolyamatait és nehézségeit megoldja.</span><span class="custom-span block operon-trust-result">Az eredmény?</span>${trustHighlightRow("Hatékony működés", LOTTIE_PRODUCTS, { charspace: true })}${trustHighlightRow("Átlátható folyamatok", LOTTIE_TRUST)}${trustHighlightRow("Adatvezérelt növekedés", LOTTIE_SHARED)}</div>`;
}

const HOME_TRUST_RE =
  /<span class="gray_span">(?:The economy, rebuilt on integrity|Vállalati működés, egy rendszerben|Teljes vállalati működés, egy rendszerben)<\/span><div global="initHighlight" class="reveal-lines[^"]*">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;

export function patchHomeTrustBlink(html) {
  return html.replace(HOME_TRUST_RE, buildHomeTrustBlinkHtml());
}
