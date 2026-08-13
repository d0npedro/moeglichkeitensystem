import { create } from "zustand";
import type { DimensionId, TimeOfDay, UmweltId } from "./types";
import {
  ALL_DIMENSION_IDS,
  DEFAULT_FOV_DEG,
  DEFAULT_RADIUS_M,
} from "./model";
import { locusById } from "./loci";
import { umweltOf } from "./umwelten";

interface FieldStore {
  locusId: string;
  radiusM: number;
  facingDeg: number;
  fovDeg: number;
  time: TimeOfDay;
  umwelt: UmweltId;
  dimensions: DimensionId[];
  selectedId: string | null;
  hoveredId: string | null;
  trail: string[];
  setRadius: (m: number) => void;
  setFacing: (deg: number) => void;
  setFov: (deg: number) => void;
  setTime: (t: TimeOfDay) => void;
  setUmwelt: (id: UmweltId) => void;
  toggleDimension: (id: DimensionId) => void;
  setAllDimensions: (on: boolean) => void;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  goTo: (locusId: string) => void;
  back: () => void;
}

export const useField = create<FieldStore>((set, get) => ({
  locusId: "studio",
  radiusM: DEFAULT_RADIUS_M,
  facingDeg: 38,
  fovDeg: DEFAULT_FOV_DEG,
  time: "morgen",
  umwelt: "mensch",
  dimensions: [...ALL_DIMENSION_IDS],
  selectedId: null,
  hoveredId: null,
  trail: [],
  setRadius: (m) => set({ radiusM: m }),
  setFacing: (deg) => set({ facingDeg: (deg + 360) % 360 }),
  setFov: (deg) => set({ fovDeg: deg }),
  setTime: (t) => set({ time: t }),
  setUmwelt: (id) => {
    const u = umweltOf(id);
    const { locusId } = get();
    set({
      umwelt: id,
      selectedId: null,
      facingDeg: locusId === "studio" ? u.studioFacing : get().facingDeg,
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
    const next = locusById(locusId);
    const { locusId: current, trail, umwelt } = get();
    if (current === locusId) return;
    const facing =
      locusId === "studio" ? umweltOf(umwelt).studioFacing : next.defaultFacing;
    set({
      locusId,
      facingDeg: facing,
      radiusM: DEFAULT_RADIUS_M,
      selectedId: null,
      trail: [...trail, current],
    });
  },
  back: () => {
    const { trail, umwelt } = get();
    if (trail.length === 0) return;
    const prev = trail[trail.length - 1]!;
    const next = locusById(prev);
    const facing = prev === "studio" ? umweltOf(umwelt).studioFacing : next.defaultFacing;
    set({
      locusId: prev,
      facingDeg: facing,
      radiusM: DEFAULT_RADIUS_M,
      selectedId: null,
      trail: trail.slice(0, -1),
    });
  },
}));
