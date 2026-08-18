import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { outgoingAura } from "./aura";
import { ALL_DIMENSION_IDS, viewFrom } from "./model";
import { ALL_OFFERS } from "./model";

const DIMS = [...ALL_DIMENSION_IDS];

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
    for (const a of ALL_OFFERS) {
      const owner = a.umwelt ?? "mensch";
      assert.ok(owner === "mensch" || owner === "entwickler" || owner === "roboter");
    }
  });
});

describe("Aura", () => {
  it("ändert die Nachricht mit der Umwelt", () => {
    const m = outgoingAura({ umwelt: "mensch", radiusM: 8, facingDeg: 38, time: "morgen" });
    const r = outgoingAura({ umwelt: "roboter", radiusM: 8, facingDeg: 90, time: "morgen" });
    assert.notEqual(m.sentence, r.sentence);
    assert.notDeepEqual(m.offers, r.offers);
    assert.match(m.sentence, /Mensch/);
    assert.match(r.sentence, /Roboter/);
  });
});
