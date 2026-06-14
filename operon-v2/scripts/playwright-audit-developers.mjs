#!/usr/bin/env node
/**
 * Audit sui.io/developers feature cards vs Operon modules showcase (local).
 */
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "../audit/developers");

async function inspectFeatureCards(page, label) {
  const sel =
    label === "operon"
      ? ".operon-modules-showcase .features-cards-wrapper"
      : "#feature-pin-section .features-cards-wrapper";

  await page.locator(sel).first().scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(label === "sui" ? 2500 : 1500);

  return page.evaluate(
    ({ lbl, selector }) => {
      const wrapper = document.querySelector(selector);
      if (!wrapper) return { label: lbl, error: `missing ${selector}` };

      const cards = [...wrapper.querySelectorAll(".feature-card")];
      return {
        label: lbl,
        cardCount: cards.length,
        cards: cards.map((card, i) => {
          const lottie =
            card.querySelector(".feature-lottie") ||
            card.querySelector("[data-animation-type='lottie']");
          return {
            index: i + 1,
            id: card.id,
            active: card.classList.contains("is--active"),
            title: card.querySelector(".feature-card-text")?.textContent?.trim(),
            sub: card.querySelector(".feature-subtext")?.textContent?.trim(),
            hasLottie: !!lottie,
            lottieSrc: lottie?.getAttribute("data-src") || null,
          };
        }),
        tabs: [...document.querySelectorAll(".hero-tab, .operon-mod-tabs .hero-tab")].map(
          (t) => t.textContent?.trim(),
        ),
      };
    },
    { lbl: label, selector: sel },
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const { name, url, label } of [
    { name: "sui-developers", url: "https://www.sui.io/developers", label: "sui" },
    {
      name: "operon-local",
      url: `${process.env.BASE_URL || "http://localhost:3002/"}#modules`,
      label: "operon",
    },
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    const data = await inspectFeatureCards(page, label);
    await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: false });
    await writeFile(join(OUT, `${name}.json`), JSON.stringify(data, null, 2));
    console.log(`[audit] ${name}:`, JSON.stringify(data, null, 2));
    await page.close();
  }

  await browser.close();
  console.log(`[audit] Saved → ${OUT}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
