#!/usr/bin/env node
/**
 * Audit sui.io/ai — hero + challenge/solution blocks for Operon clone.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "../audit/sui-ai");
const URL = "https://www.sui.io/ai";

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2500);

  await page.screenshot({ path: join(OUT, "01-hero.png"), fullPage: false });

  const structure = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className,
        text: el.textContent?.trim().slice(0, 120),
        rect: { top: r.top, left: r.left, width: r.width, height: r.height },
        styles: {
          display: cs.display,
          background: cs.backgroundColor,
          color: cs.color,
          padding: cs.padding,
          gridTemplate: cs.gridTemplateColumns,
          gap: cs.gap,
        },
        childCount: el.children.length,
        globals: [...el.querySelectorAll("[global]")].map((n) => n.getAttribute("global")),
      };
    };

    const headings = [...document.querySelectorAll("h1,h2,h3,h4")].slice(0, 20).map((h) => ({
      tag: h.tagName,
      class: h.className,
      text: h.textContent?.trim().slice(0, 100),
    }));

    const challenge = [...document.querySelectorAll("*")].find((el) =>
      /the challenge/i.test(el.textContent || "") && el.children.length < 8,
    );
    const solution = [...document.querySelectorAll("*")].find((el) =>
      /the solution/i.test(el.textContent || "") && el.children.length < 8,
    );

    const cards = [...document.querySelectorAll("[class*='card'], [class*='benefit'], [class*='feature']")]
      .slice(0, 30)
      .map((el) => ({
        class: el.className,
        text: el.textContent?.trim().slice(0, 80),
      }));

    return {
      title: document.title,
      headings,
      hero: pick(".hero-section, [class*='hero'], section:first-of-type"),
      challenge: challenge
        ? { class: challenge.className, tag: challenge.tagName, html: challenge.outerHTML.slice(0, 600) }
        : null,
      solution: solution
        ? { class: solution.className, tag: solution.tagName, html: solution.outerHTML.slice(0, 600) }
        : null,
      globals: [...new Set([...document.querySelectorAll("[global]")].map((el) => el.getAttribute("global")))],
      sections: [...document.querySelectorAll("section")].slice(0, 12).map((s) => ({
        class: s.className,
        text: s.textContent?.trim().slice(0, 100),
      })),
      cards,
    };
  });

  await writeFile(join(OUT, "structure.json"), JSON.stringify(structure, null, 2));

  // Scroll through challenge/solution area
  for (const y of [0, 400, 800, 1200, 1600, 2000]) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(OUT, `scroll-${y}.png`) });
  }

  const scrollEffects = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll("[global]").forEach((el) => {
      results.push({
        global: el.getAttribute("global"),
        class: el.className,
        tag: el.tagName,
      });
    });
    return results;
  });
  await writeFile(join(OUT, "global-hooks.json"), JSON.stringify(scrollEffects, null, 2));

  // Get full HTML of main content area
  const mainHtml = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const sections = [...main.querySelectorAll("section")].slice(0, 4);
    return sections.map((s) => ({
      class: s.className,
      outerHTML: s.outerHTML.slice(0, 4000),
    }));
  });
  await writeFile(join(OUT, "sections-html.json"), JSON.stringify(mainHtml, null, 2));

  await browser.close();
  console.log("[operon-v2] Sui AI audit saved to operon-v2/audit/sui-ai/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
