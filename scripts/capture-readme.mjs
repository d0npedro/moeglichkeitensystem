import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const BASE = process.env.SHOT_BASE ?? "http://127.0.0.1:4173";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "media");

const DESK = { width: 1440, height: 1760 };
const PAGE = { width: 1280, height: 1100 };
const PHONE = { width: 390, height: 844 };

/** @type {{ file: string, path: string, size: {width:number,height:number}, wait?: string, target?: string, click?: string }[]} */
const SHOTS = [
  { file: "arbeit.png", path: "/", size: PAGE, wait: "Was ein Ort" },
  { file: "feld-mensch.png", path: "/feld", size: DESK, wait: "Lichtschalter" },
  {
    file: "feld-roboter.png",
    path: "/feld",
    size: DESK,
    wait: "Türlichtmaß",
    click: "Roboter",
  },
  {
    file: "feld-entwickler.png",
    path: "/feld",
    size: DESK,
    wait: "Rechner",
    click: "Entwickler",
  },
  {
    file: "feld-inspector.png",
    path: "/feld",
    size: DESK,
    wait: "Helligkeit",
    click: "Lichtschalter",
  },
  {
    file: "feld-aura.png",
    path: "/feld",
    size: DESK,
    wait: "Was die Nähe lesen darf",
  },
  {
    file: "feld-plan.png",
    path: "/feld",
    size: { width: 1440, height: 1100 },
    wait: "Lichtschalter",
    target: "main",
  },
  { file: "arbeit-telefon.png", path: "/", size: PHONE, wait: "Was ein Ort" },
  {
    file: "feld-telefon.png",
    path: "/feld",
    size: PHONE,
    wait: "Lichtschalter",
    target: "main",
  },
];

async function settle(page, text) {
  await page.waitForSelector("body", { timeout: 20000 });
  if (text) {
    await page.getByText(text, { exact: false }).first().waitFor({ state: "visible", timeout: 25000 });
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const img of document.images) {
      if (!img.complete) {
        await new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }
    }
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("a, button")) {
      const t = (el.textContent || "").trim();
      if (t === "Anmelden" || t === "Konto") el.style.visibility = "hidden";
    }
  });
  await page.waitForTimeout(200);
}

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  deviceScaleFactor: 2,
  colorScheme: "light",
  locale: "de-DE",
});

try {
  for (const shot of SHOTS) {
    const page = await context.newPage();
    await page.setViewportSize(shot.size);
    const url = `${BASE}${shot.path}`;
    const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    if (!res || !res.ok()) {
      throw new Error(`${url} → ${res?.status() ?? "no response"}`);
    }
    await settle(page, shot.click ? "Umwelt" : shot.wait);
    if (shot.click) {
      await page.getByRole("button", { name: shot.click, exact: true }).first().click();
      await page.getByText(shot.wait, { exact: false }).first().waitFor({ state: "attached", timeout: 15000 });
      await page.waitForTimeout(350);
    }
    const dest = join(OUT, shot.file);
    if (shot.target) {
      await page.locator(shot.target).first().screenshot({ path: dest, type: "png", animations: "disabled" });
    } else {
      await page.screenshot({ path: dest, type: "png", animations: "disabled" });
    }
    console.log(`wrote ${shot.file}`);
    await page.close();
  }
} finally {
  await browser.close();
}
