#!/usr/bin/env node
import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3002";
const OUT = join(import.meta.dirname, "../audit/local");

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  for (const path of ["/", "/developers/"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);
    const slug = path === "/" ? "home" : "developers";
    await page.screenshot({ path: join(OUT, `${slug}-desktop.png`), fullPage: false });
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(OUT, `${slug}-scrolled.png`), fullPage: false });
    await ctx.close();
  }
  await browser.close();
  console.log("[operon-v2] Local screenshots → operon-v2/audit/local/");
}

main();
