import type { LageId, TimeOfDay, UmweltId } from "./types";

export interface FieldShare {
  umwelt: UmweltId;
  locusId: string;
  radiusM: number;
  facingDeg: number;
  time: TimeOfDay;
  timeLive: boolean;
  lage: LageId;
  selectedId: string | null;
}

const UMWELT: UmweltId[] = ["mensch", "entwickler", "roboter"];
const TIME: TimeOfDay[] = ["morgen", "tag", "abend", "nacht"];
const LAGE: LageId[] = ["neutral", "hungrig", "satt", "muede", "termin"];

function oneOf<T extends string>(raw: string | null, allowed: readonly T[], fallback: T): T {
  if (raw && (allowed as readonly string[]).includes(raw)) return raw as T;
  return fallback;
}

function num(raw: string | null, fallback: number, min: number, max: number): number {
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function encodeField(s: FieldShare): string {
  const p = new URLSearchParams();
  p.set("u", s.umwelt);
  p.set("ort", s.locusId);
  p.set("r", String(Math.round(s.radiusM * 10) / 10));
  p.set("blick", String(Math.round(s.facingDeg)));
  p.set("lage", s.lage);
  if (s.timeLive) {
    p.set("live", "1");
  } else {
    p.set("live", "0");
    p.set("zeit", s.time);
  }
  if (s.selectedId) p.set("marke", s.selectedId);
  return p.toString();
}

export function decodeField(search: string): Partial<FieldShare> {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  if (![...q.keys()].length) return {};
  const liveRaw = q.get("live");
  const timeLive = liveRaw === null ? true : liveRaw !== "0";
  const out: Partial<FieldShare> = {
    umwelt: oneOf(q.get("u"), UMWELT, "mensch"),
    timeLive,
    lage: oneOf(q.get("lage"), LAGE, "neutral"),
  };
  const ort = q.get("ort");
  if (ort) out.locusId = ort.slice(0, 64);
  out.radiusM = num(q.get("r"), 8, 1.2, 8000);
  out.facingDeg = num(q.get("blick"), 38, 0, 359);
  if (!timeLive) out.time = oneOf(q.get("zeit"), TIME, "morgen");
  const marke = q.get("marke");
  out.selectedId = marke ? marke.slice(0, 80) : null;
  return out;
}

export function fieldSharePath(s: FieldShare): string {
  const q = encodeField(s);
  return q ? `/feld?${q}` : "/feld";
}
