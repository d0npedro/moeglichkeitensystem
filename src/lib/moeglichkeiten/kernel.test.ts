import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { allOffers, ownerOf } from "./atlas";
import { timeFromClock } from "./clock";
import { inspectorLines } from "./inspector";
import { lageFactor } from "./lage";
import { ALL_DIMENSION_IDS, isAvailable, viewFrom } from "./model";
import { decodeField, encodeField } from "./shareField";
import type { Affordance, ViewedAffordance } from "./types";

const DIMS = [...ALL_DIMENSION_IDS];

function viewed(partial: Partial<ViewedAffordance> & Pick<ViewedAffordance, "id" | "title">): ViewedAffordance {
  return {
    locusId: "studio",
    verb: "Drücken",
    description: "Test",
    humanUse: "Prüfen.",
    dimension: "handeln",
    lx: 1,
    ly: 1,
    visibleStanding: true,
    requiresWalk: true,
    walkSeconds: 6,
    salience: 0.9,
    umwelt: "mensch",
    worldX: 1,
    worldY: 1,
    distanceM: 3,
    bearingDeg: 40,
    inRadius: true,
    inFov: true,
    available: true,
    sinn: 1,
    ...partial,
  };
}

describe("Umweltfilter", () => {
  it("gibt in keiner Umwelt dieselbe Titelliste", () => {
    const m = viewFrom("studio", 12, 38, 128, "morgen", DIMS, "mensch");
    const e = viewFrom("studio", 12, 270, 128, "morgen", DIMS, "entwickler");
    const r = viewFrom("studio", 12, 90, 128, "morgen", DIMS, "roboter");
    const titles = (rows: { title: string }[]) => new Set(rows.map((x) => x.title));
    const sameME = [...titles(m)].filter((t) => titles(e).has(t));
    const sameMR = [...titles(m)].filter((t) => titles(r).has(t));
    assert.equal(sameME.length, 0);
    assert.equal(sameMR.length, 0);
    assert.ok(m.length > 3);
    assert.ok(e.length > 3);
    assert.ok(r.length > 3);
  });

  it("weist jedem Angebot eine Umwelt zu", () => {
    for (const a of allOffers()) {
      assert.ok(ownerOf(a) === "mensch" || ownerOf(a) === "entwickler" || ownerOf(a) === "roboter");
    }
  });
});

describe("Ranking und Lage", () => {
  it("Hunger hebt die Bäckerei", () => {
    const item = { locusId: "baeckerei", dimension: "konsumieren", inventory: [{ name: "x", available: ["morgen"] }] } as Affordance;
    assert.ok(lageFactor(item, "hungrig", "mensch") > lageFactor(item, "satt", "mensch"));
  });

  it("satt senkt die Bäckerei unter Neutral", () => {
    const item = { locusId: "baeckerei", dimension: "konsumieren" } as Affordance;
    assert.ok(lageFactor(item, "satt", "mensch") < lageFactor(item, "neutral", "mensch"));
  });

  it("Radius schneidet die Bäckerei ab", () => {
    const nah = viewFrom("studio", 8, 38, 128, "morgen", DIMS, "mensch");
    const weit = viewFrom("studio", 800, 38, 128, "morgen", DIMS, "mensch");
    assert.equal(nah.some((i) => i.locusId === "baeckerei" && i.inRadius), false);
    assert.equal(weit.some((i) => i.locusId === "baeckerei" && i.inRadius), true);
  });
});

describe("Zeit und Bestand", () => {
  it("ordnet Uhrzeiten den Bändern zu", () => {
    assert.equal(timeFromClock(new Date(2026, 0, 1, 8, 0)), "morgen");
    assert.equal(timeFromClock(new Date(2026, 0, 1, 13, 0)), "tag");
    assert.equal(timeFromClock(new Date(2026, 0, 1, 19, 0)), "abend");
    assert.equal(timeFromClock(new Date(2026, 0, 1, 23, 0)), "nacht");
    assert.equal(timeFromClock(new Date(2026, 0, 1, 3, 0)), "nacht");
  });

  it("schließt die Bäckerei in der Nacht", () => {
    const offer = allOffers().find((a) => a.id === "baeckerei-ort");
    assert.ok(offer);
    assert.equal(isAvailable(offer, "nacht"), false);
    assert.equal(isAvailable(offer, "morgen"), true);
  });

  it("Milchbrötchen nur am Morgen", () => {
    const offer = allOffers().find((a) => a.id === "baeckerei-ort");
    const milch = offer?.inventory?.find((r) => r.name === "Milchbrötchen");
    assert.ok(milch);
    assert.deepEqual(milch.available, ["morgen"]);
  });
});

describe("Share-URL", () => {
  it("rundet und liest denselben Zustand", () => {
    const q = encodeField({
      umwelt: "roboter",
      locusId: "baeckerei",
      radiusM: 420.44,
      facingDeg: 12.2,
      time: "tag",
      timeLive: false,
      lage: "hungrig",
      selectedId: "bot-baeckerei",
    });
    const got = decodeField(q);
    assert.equal(got.umwelt, "roboter");
    assert.equal(got.locusId, "baeckerei");
    assert.equal(got.radiusM, 420.4);
    assert.equal(got.facingDeg, 12);
    assert.equal(got.time, "tag");
    assert.equal(got.timeLive, false);
    assert.equal(got.lage, "hungrig");
    assert.equal(got.selectedId, "bot-baeckerei");
  });

  it("live lässt die Uhr laufen", () => {
    const q = encodeField({
      umwelt: "mensch",
      locusId: "studio",
      radiusM: 8,
      facingDeg: 38,
      time: "nacht",
      timeLive: true,
      lage: "neutral",
      selectedId: null,
    });
    const got = decodeField(q);
    assert.equal(got.timeLive, true);
    assert.equal(got.time, undefined);
  });
});

describe("Inspector", () => {
  it("spricht in vier Sätzen", () => {
    const lines = inspectorLines(
      viewed({ id: "x-licht", title: "Lichtschalter", verb: "Betätigen" }),
      "mensch",
      "morgen",
      "neutral",
    );
    assert.match(lines.was, /Lichtschalter/);
    assert.match(lines.fuerWen, /Körper/);
    assert.match(lines.warumJetzt, /Morgen/);
    assert.match(lines.tun, /Hinlaufen/);
  });
});
