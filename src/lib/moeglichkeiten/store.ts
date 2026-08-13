import { create } from "zustand";
import type { DimensionId, LageId, TimeOfDay, UmweltId } from "./types";
import {
  ALL_DIMENSION_IDS,
  DEFAULT_FOV_DEG,
  DEFAULT_RADIUS_M,
} from "./model";
import { findLocus } from "./atlas";
import { timeFromClock } from "./clock";
import type { FieldShare } from "./shareField";
import { umweltOf } from "./umwelten";

interface FieldStore {
  locusId: string;
  radiusM: number;
  facingDeg: number;
  fovDeg: number;
  time: TimeOfDay;
  timeLive: boolean;
  lage: LageId;
  umwelt: UmweltId;
  dimensions: DimensionId[];
  selectedId: string | null;
  hoveredId: string | null;
  trail: string[];
  atlasTick: number;
  setRadius: (m: number) => void;
  setFacing: (deg: number) => void;
  setFov: (deg: number) => void;
  setTime: (t: TimeOfDay) => void;
  setTimeLive: (on: boolean) => void;
  tickClock: () => void;
  setLage: (id: LageId) => void;
  setUmwelt: (id: UmweltId) => void;
  toggleDimension: (id: DimensionId) => void;
  setAllDimensions: (on: boolean) => void;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  goTo: (locusId: string) => void;
  back: () => void;
  applyShare: (s: Partial<FieldShare>) => void;
  bumpAtlas: () => void;
}

function facingFor(locusId: string, umwelt: UmweltId, fallback: number) {
  if (locusId === "studio") return umweltOf(umwelt).studioFacing;
  return fallback;
}

export const useField = create<FieldStore>((set, get) => ({
  locusId: "studio",
  radiusM: DEFAULT_RADIUS_M,
  facingDeg: 38,
  fovDeg: DEFAULT_FOV_DEG,
  time: timeFromClock(),
  timeLive: true,
  lage: "neutral",
  umwelt: "mensch",
  dimensions: [...ALL_DIMENSION_IDS],
  selectedId: null,
  hoveredId: null,
  trail: [],
  atlasTick: 0,
  setRadius: (m) => set({ radiusM: m }),
  setFacing: (deg) => set({ facingDeg: (deg + 360) % 360 }),
  setFov: (deg) => set({ fovDeg: deg }),
  setTime: (t) => set({ time: t, timeLive: false }),
  setTimeLive: (on) =>
    set({
      timeLive: on,
      time: on ? timeFromClock() : get().time,
    }),
  tickClock: () => {
    if (!get().timeLive) return;
    const next = timeFromClock();
    if (next !== get().time) set({ time: next });
  },
  setLage: (id) => set({ lage: id }),
  setUmwelt: (id) => {
    const { locusId } = get();
    const loc = findLocus(locusId);
    set({
      umwelt: id,
      selectedId: null,
      facingDeg: facingFor(locusId, id, loc?.defaultFacing ?? get().facingDeg),
    });
  },
  toggleDimension: (id) =>
    set((s) => {
      const has = s.dimensions.includes(id);
      if (has && s.dimensions.length === 1) return s;
      return {
        dimensions: has ? s.dimensions.filter((d) => d !== id) : [...s.dimensions, id],
      };
    }),
  setAllDimensions: (on) => set({ dimensions: on ? [...ALL_DIMENSION_IDS] : ["handeln"] }),
  select: (id) => set({ selectedId: id }),
  hover: (id) => set({ hoveredId: id }),
  goTo: (locusId) => {
    const next = findLocus(locusId);
    if (!next) return;
    const { locusId: current, trail, umwelt } = get();
    if (current === locusId) return;
    set({
      locusId,
      facingDeg: facingFor(locusId, umwelt, next.defaultFacing),
      radiusM: DEFAULT_RADIUS_M,
      selectedId: null,
      trail: [...trail, current],
    });
  },
  back: () => {
    const { trail, umwelt } = get();
    if (trail.length === 0) return;
    const prev = trail[trail.length - 1]!;
    const next = findLocus(prev);
    if (!next) return;
    set({
      locusId: prev,
      facingDeg: facingFor(prev, umwelt, next.defaultFacing),
      radiusM: DEFAULT_RADIUS_M,
      selectedId: null,
      trail: trail.slice(0, -1),
    });
  },
  applyShare: (s) => {
    const cur = get();
    const locusId = s.locusId && findLocus(s.locusId) ? s.locusId : cur.locusId;
    set({
      umwelt: s.umwelt ?? cur.umwelt,
      locusId,
      radiusM: s.radiusM ?? cur.radiusM,
      facingDeg: s.facingDeg ?? cur.facingDeg,
      time: s.timeLive === false && s.time ? s.time : s.timeLive === false ? cur.time : timeFromClock(),
      timeLive: s.timeLive ?? cur.timeLive,
      lage: s.lage ?? cur.lage,
      selectedId: s.selectedId === undefined ? cur.selectedId : s.selectedId,
    });
  },
  bumpAtlas: () => set({ atlasTick: get().atlasTick + 1 }),
}));
