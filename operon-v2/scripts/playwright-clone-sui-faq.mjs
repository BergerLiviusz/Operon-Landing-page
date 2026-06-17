#!/usr/bin/env node
/**
 * Playwright audit of sui.io/faq — captures accordion structure for Operon clone.
 * Output: operon-v2/audit/sui-faq/
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "../audit/sui-faq");
const URL = "https://www.sui.io/faq";

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: join(OUT, "01-hero.png"), fullPage: false });

  const data = await page.evaluate(() => {
    const hero = document.querySelector(".faq-hero");
    const main = document.querySelector(".faq-main");
    const items = [...document.querySelectorAll(".faq-dd")].map((dd) => ({
      question: dd.querySelector(".faq-dd_head h2")?.textContent?.trim(),
      bodyHtml: dd.querySelector(".faq-dd_body_inner")?.innerHTML?.slice(0, 1200),
      cardCount: dd.querySelectorAll(".card-main").length,
    }));

    return {
      title: document.title,
      heroClass: hero?.className,
      heroHtml: hero?.outerHTML.slice(0, 2500),
      mainClass: main?.className,
      itemCount: items.length,
      items,
      globals: [...new Set([...document.querySelectorAll("[global]")].map((el) => el.getAttribute("global")))],
    };
  });

  await writeFile(join(OUT, "structure.json"), JSON.stringify(data, null, 2));

  // Capture open state after clicking first item
  await page.click(".faq-dd_head");
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(OUT, "02-first-open.png"), fullPage: false });

  await browser.close();
  console.log(`[operon-v2] Sui FAQ audit → ${OUT} (${data.itemCount} items)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
