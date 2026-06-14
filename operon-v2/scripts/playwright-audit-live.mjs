#!/usr/bin/env node
import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "../audit/live");
const PAGES = [
  { name: "home", url: "https://www.sui.io/" },
  { name: "developers", url: "https://www.sui.io/developers" },
];

async function audit(page, name, viewport) {
  const dir = join(OUT, name, viewport);
  await mkdir(dir, { recursive: true });
  const notes = [];

  await page.goto(PAGES.find((p) => p.name === name).url, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(dir, "01-initial.png") });

  const libs = await page.evaluate(() => ({
    gsap: typeof window.gsap !== "undefined",
    ScrollTrigger: typeof window.ScrollTrigger !== "undefined",
    lenis: document.documentElement.classList.contains("lenis"),
  }));
  notes.push(`libs: ${JSON.stringify(libs)}`);

  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(dir, "02-scrolled.png") });

  const hooks = await page.evaluate(() => [
    ...new Set([...document.querySelectorAll("[global]")].map((el) => el.getAttribute("global"))),
  ]);
  notes.push(`global hooks: ${hooks.join(", ")}`);

  await writeFile(join(dir, "notes.txt"), notes.join("\n"));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  for (const { name } of PAGES) {
    for (const [vp, opts] of [
      ["desktop", { viewport: { width: 1440, height: 900 } }],
      ["mobile", devices["iPhone 13"]],
    ]) {
      const ctx = await browser.newContext(opts);
      const page = await ctx.newPage();
      await audit(page, name, vp);
      await ctx.close();
    }
  }
  await browser.close();
  console.log("[operon-v2] Live audit saved to operon-v2/audit/live/");
}

main();
