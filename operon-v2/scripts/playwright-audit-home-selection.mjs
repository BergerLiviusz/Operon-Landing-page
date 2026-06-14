#!/usr/bin/env node
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "../audit/home-selection");

async function inspect(page, label) {
  await page.locator("section.home-selection").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  return page.evaluate((lbl) => {
    const section = document.querySelector("section.home-selection");
    if (!section) return { label: lbl, error: "section.home-selection not found" };

    const rows = [...section.querySelectorAll(".f_grid_2")];

    return {
      label: lbl,
      rowCount: rows.length,
      rows: rows.map((row, i) => {
        const wrapper = row.querySelector(".tabs_wrapper");
        const dotted = wrapper?.querySelector(".svgdotted");
        const path = dotted?.querySelector("path");
        const icon =
          row.querySelector(".mw-64.background-blue") ||
          row.querySelector(".operon-icon-tile") ||
          row.querySelector("[global='lottieReveal']");
        const h3 = row.querySelector("h3");

        return {
          index: i + 1,
          title: h3?.textContent?.trim(),
          hasDottedSvg: !!dotted,
          dottedDisplay: dotted ? getComputedStyle(dotted).display : null,
          dottedStroke: path ? getComputedStyle(path).stroke : null,
          dottedOpacity: path ? getComputedStyle(path).opacity : null,
          iconClass: icon?.className || null,
          iconGlobal: icon?.getAttribute("global") || null,
          iconHasLottieSvg: !!icon?.querySelector("svg"),
          iconHasCanvas: !!icon?.querySelector("canvas"),
          iconChildCount: icon?.childElementCount ?? 0,
          iconBg: icon ? getComputedStyle(icon).backgroundColor : null,
          iconSize: icon ? `${icon.offsetWidth}×${icon.offsetHeight}` : null,
        };
      }),
    };
  }, label);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const { name, url } of [
    { name: "sui-live", url: "https://www.sui.io/" },
    { name: "operon-local", url: process.env.BASE_URL || "http://localhost:3002/" },
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    const data = await inspect(page, name);
    await page.screenshot({ path: join(OUT, `${name}.png`) });
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
