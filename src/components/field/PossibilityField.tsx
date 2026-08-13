import { useEffect, useMemo, useRef, useState, type PointerEvent, type WheelEvent } from "react";
import type { ViewedAffordance } from "@/lib/moeglichkeiten/types";
import {
  dimensionOf,
  formatDistance,
  horizonItems,
  polar,
  rnd,
  SCALES,
  worldToPlot,
} from "@/lib/moeglichkeiten/model";
import {
  APARTMENT_WALLS,
  PLAN_RADIUS_M,
  ROOM_LABELS,
  STUDIO_FURNISHINGS,
} from "@/lib/moeglichkeiten/geometry";
import { LOCI } from "@/lib/moeglichkeiten/loci";
import { useField } from "@/lib/moeglichkeiten/store";
import { FieldMark } from "./marks";

const VB = 820;
const CX = VB / 2;
const CY = VB / 2;
const PLOT = 328;

function fovPath(cx: number, cy: number, facing: number, fov: number, r: number) {
  const a0 = facing - fov / 2;
  const a1 = facing + fov / 2;
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = fov > 180 ? 1 : 0;
  return `M ${rnd(cx)} ${rnd(cy)} L ${rnd(p0.x)} ${rnd(p0.y)} A ${rnd(r)} ${rnd(r)} 0 ${large} 1 ${rnd(p1.x)} ${rnd(p1.y)} Z`;
}

export function PossibilityField({ items }: { items: ViewedAffordance[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <div className="grid h-full min-h-80 place-items-center text-sm text-muted">
        Feld wird gezeichnet
      </div>
    );
  }

  return <FieldSvg items={items} />;
}

function FieldSvg({ items }: { items: ViewedAffordance[] }) {
  const {
    locusId,
    radiusM,
    facingDeg,
    fovDeg,
    selectedId,
    hoveredId,
    select,
    hover,
    setFacing,
    setRadius,
  } = useField();
  const root = useRef<SVGSVGElement>(null);
  const origin = LOCI.find((l) => l.id === locusId)!;

  const toPlot = (wx: number, wy: number) =>
    worldToPlot(wx, wy, origin.x, origin.y, radiusM, CX, CY, PLOT);

  const radiusEdge = toPlot(origin.x, origin.y + radiusM);
  const radiusPlot = Math.hypot(radiusEdge.x - CX, radiusEdge.y - CY);
  const showPlan = radiusM < PLAN_RADIUS_M;
  const innerCut = radiusM > 90 ? radiusM * 0.1 : 0;
  const drawn = horizonItems(items, radiusM, locusId);
  const horizon = drawn;
  const fieldItems = items.filter(
    (i) =>
      i.id === selectedId ||
      i.id === hoveredId ||
      (drawn.some((d) => d.id === i.id) && i.distanceM >= innerCut),
  );

  const labeled = useMemo(() => {
    const top = horizon
      .filter((i) => {
        if (i.sinn <= 0.16) return false;
        if (i.distanceM < innerCut) return false;
        return true;
      })
      .slice(0, 5);
    const extra = items.filter((i) => i.id === selectedId || i.id === hoveredId);
    const map = new Map<string, ViewedAffordance>();
    for (const i of [...top, ...extra]) map.set(i.id, i);
    return [...map.values()];
  }, [horizon, items, selectedId, hoveredId, innerCut]);

  function pointFromEvent(e: PointerEvent<SVGSVGElement>) {
    const svg = root.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  }

  function onPointerDown(e: PointerEvent<SVGSVGElement>) {
    if ((e.target as Element).closest("[data-node]")) return;
    const p = pointFromEvent(e);
    if (!p) return;
    const dx = p.x - CX;
    const dy = p.y - CY;
    if (Math.hypot(dx, dy) < 16) return;
    const deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    setFacing((deg + 360) % 360);
  }

  function onWheel(e: WheelEvent<SVGSVGElement>) {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.12 : 0.89;
    setRadius(Math.min(8000, Math.max(1.2, radiusM * factor)));
  }

  const labelPlaced = useMemo(() => {
    const out: { item: ViewedAffordance; x: number; y: number; anchor: "start" | "end" }[] = [];
    for (const item of labeled) {
      if (!item.inRadius && item.id !== selectedId && item.id !== hoveredId) continue;
      const p = toPlot(item.worldX, item.worldY);
      const dx = p.x - CX;
      const dy = p.y - CY;
      const len = Math.hypot(dx, dy) || 1;
      let lx = p.x + (dx / len) * 16;
      let ly = p.y + (dy / len) * 12 - 6;
      for (const prev of out) {
        if (Math.abs(prev.y - ly) < 15 && Math.abs(prev.x - lx) < 90) {
          ly += dy >= 0 ? 15 : -15;
        }
      }
      out.push({
        item,
        x: rnd(lx),
        y: rnd(ly),
        anchor: lx >= CX ? "start" : "end",
      });
    }
    return out;
    // toPlot is stable per render inputs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labeled, origin.x, origin.y, radiusM, selectedId, hoveredId]);

  const visibleScales = SCALES.filter((s) => s.toM <= radiusM * 1.15 && s.toM >= radiusM * 0.12);

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${VB} ${VB}`}
      className="h-full w-full touch-none select-none"
      role="img"
      aria-label="Möglichkeitsfeld vom Zentrum"
      onPointerDown={onPointerDown}
      onWheel={onWheel}
    >
      <defs>
        <radialGradient id="fieldWash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-elevated)" stopOpacity="0.95" />
          <stop offset="72%" stopColor="var(--color-surface)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-bg)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CX} cy={CY} r={PLOT + 22} fill="url(#fieldWash)" />

      {visibleScales.map((scale) => {
        const edge = toPlot(origin.x, origin.y + scale.toM);
        const r = rnd(Math.hypot(edge.x - CX, edge.y - CY));
        return (
          <g key={scale.id}>
            <circle
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
            <text
              x={rnd(CX + 10)}
              y={rnd(CY - r + 4)}
              fill="var(--color-subtle)"
              fontSize="11"
              fontFamily="var(--font-sans)"
              letterSpacing="0.08em"
            >
              {scale.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      <circle
        cx={CX}
        cy={CY}
        r={rnd(radiusPlot)}
        fill="color-mix(in oklab, var(--color-primary) 6%, transparent)"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
      />

      <path
        d={fovPath(CX, CY, facingDeg, fovDeg, radiusPlot)}
        fill="color-mix(in oklab, var(--color-primary) 11%, transparent)"
      />

      {showPlan
        ? STUDIO_FURNISHINGS.map((f, i) => {
            const midX = f.x + f.w / 2;
            const midY = f.y + f.h / 2;
            if (Math.hypot(midX - origin.x, midY - origin.y) > radiusM * 1.15) return null;
            const a = toPlot(f.x, f.y + f.h);
            const b = toPlot(f.x + f.w, f.y);
            const x = Math.min(a.x, b.x);
            const y = Math.min(a.y, b.y);
            const w = Math.abs(b.x - a.x);
            const h = Math.abs(b.y - a.y);
            if (w < 2 || h < 2) return null;
            return (
              <rect
                key={`furn-${i}`}
                x={rnd(x)}
                y={rnd(y)}
                width={rnd(w)}
                height={rnd(h)}
                fill="color-mix(in oklab, var(--color-wash) 70%, transparent)"
                stroke="var(--color-border)"
                strokeWidth="0.8"
              />
            );
          })
        : null}

      {showPlan
        ? APARTMENT_WALLS.map((wall, i) => {
            const midX = (wall.x1 + wall.x2) / 2;
            const midY = (wall.y1 + wall.y2) / 2;
            if (Math.hypot(midX - origin.x, midY - origin.y) > radiusM * 1.2) return null;
            const a = toPlot(wall.x1, wall.y1);
            const b = toPlot(wall.x2, wall.y2);
            const door = wall.kind === "door";
            const win = wall.kind === "window";
            return (
              <line
                key={`w-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={win ? "var(--color-primary)" : "var(--color-mark)"}
                strokeWidth={win ? 2.4 : door ? 1.2 : 1.7}
                strokeLinecap="square"
                opacity={door ? 0.22 : 0.85}
              />
            );
          })
        : null}

      {showPlan
        ? ROOM_LABELS.map((room) => {
            if (Math.hypot(room.x - origin.x, room.y - origin.y) > radiusM * 0.92) return null;
            const p = toPlot(room.x, room.y);
            return (
              <text
                key={room.name}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                fill="var(--color-subtle)"
                fontSize="11"
                fontFamily="var(--font-sans)"
                letterSpacing="0.12em"
                className="pointer-events-none"
              >
                {room.name.toUpperCase()}
              </text>
            );
          })
        : null}

      {(() => {
        const nose = polar(CX, CY, 30, facingDeg);
        return (
          <line
            x1={CX}
            y1={CY}
            x2={rnd(nose.x)}
            y2={rnd(nose.y)}
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        );
      })()}

      {horizon
        .filter(
          (item) =>
            item.distanceM >= innerCut &&
            (item.id === selectedId || item.sinn > 0.35 || item.distanceM > radiusM * 0.2),
        )
        .slice(0, 10)
        .map((item) => {
        const p = toPlot(item.worldX, item.worldY);
        const hot = item.id === selectedId;
        return (
          <line
            key={`ray-${item.id}`}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="var(--color-border)"
            strokeWidth={hot ? 1.4 : 0.55}
            strokeDasharray={item.requiresWalk ? "3 5" : "0"}
            opacity={item.inFov && item.available ? 0.65 : 0.2}
          />
        );
      })}

      {fieldItems.map((item) => {
        if (!item.inRadius && item.distanceM > radiusM * 1.35) return null;
        const p = toPlot(item.worldX, item.worldY);
        const dim = dimensionOf(item.dimension);
        const active = item.inRadius;
        const hot = item.id === selectedId || item.id === hoveredId;
        const faded = !active || !item.available;
        return (
          <g
            key={item.id}
            data-node="1"
            transform={`translate(${p.x} ${p.y})`}
            className="cursor-pointer"
            opacity={faded ? 0.28 : item.inFov ? 1 : 0.52}
            onPointerEnter={() => hover(item.id)}
            onPointerLeave={() => hover(null)}
            onPointerDown={(ev) => {
              ev.stopPropagation();
              select(item.id);
            }}
          >
            {hot ? (
              <circle r="12" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
            ) : null}
            <g className="text-mark">
              <FieldMark shape={dim.mark} size={hot ? 6.2 : 4.8} emphasis={active && item.inFov} />
            </g>
          </g>
        );
      })}

      {labelPlaced.map(({ item, x, y, anchor }) => (
        <text
          key={`lab-${item.id}`}
          x={x}
          y={y}
          textAnchor={anchor}
          fill="var(--color-fg)"
          fontSize="12"
          fontFamily="var(--font-sans)"
          className="pointer-events-none"
        >
          {item.title}
          <tspan fill="var(--color-muted)" dx="6">
            {formatDistance(item.distanceM)}
          </tspan>
        </text>
      ))}

      <g transform={`translate(${CX} ${CY})`} className="pointer-events-none">
        <circle r="10" fill="var(--color-elevated)" stroke="var(--color-primary)" strokeWidth="1.7" />
        <circle r="2.3" fill="var(--color-primary)" />
        {innerCut > 0 ? (
          <text
            y="22"
            textAnchor="middle"
            fill="var(--color-subtle)"
            fontSize="10"
            fontFamily="var(--font-sans)"
            letterSpacing="0.12em"
          >
            {origin.name.toUpperCase()}
          </text>
        ) : null}
      </g>

      <text
        x={CX}
        y={28}
        textAnchor="middle"
        fill="var(--color-subtle)"
        fontSize="11"
        fontFamily="var(--font-sans)"
        letterSpacing="0.16em"
      >
        N
      </text>

      <text
        x={CX}
        y={CY + PLOT + 44}
        textAnchor="middle"
        fill="var(--color-subtle)"
        fontSize="11"
        fontFamily="var(--font-sans)"
        letterSpacing="0.12em"
      >
        KLICKEN WENDET DEN BLICK · RAD ÄNDERT DEN RADIUS
      </text>
    </svg>
  );
}
