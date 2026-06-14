#!/usr/bin/env node
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3002";

async function check(path, label) {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const [vp, opts] of [
    ["desktop", { viewport: { width: 1440, height: 900 } }],
    ["mobile", devices["iPhone 13"]],
  ]) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4000);
    results.push({
      label,
      vp,
      status: res?.status(),
      title: await page.title(),
      gsap: await page.evaluate(() => typeof window.gsap !== "undefined"),
      lenis: await page.evaluate(() => document.documentElement.classList.contains("lenis")),
      hero: await page.evaluate(() => document.querySelector(".hero_heading")?.textContent?.trim()),
    });
    await ctx.close();
  }
  await browser.close();
  return results;
}

async function main() {
  const all = [...(await check("/", "home")), ...(await check("/developers/", "developers"))];
  console.log(JSON.stringify(all, null, 2));
  const bad = all.filter((r) => r.status !== 200 || !r.gsap);
  process.exit(bad.length ? 1 : 0);
}

main();
