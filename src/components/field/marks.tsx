import type { MarkShape } from "@/lib/moeglichkeiten/types";

export function FieldMark({
  shape,
  size = 5,
  emphasis = false,
}: {
  shape: MarkShape;
  size?: number;
  emphasis?: boolean;
}) {
  const s = size;
  const stroke = emphasis ? 1.6 : 1.15;
  const fill = emphasis ? "currentColor" : "none";
  switch (shape) {
    case "circle":
      return <circle r={s} fill={emphasis ? "currentColor" : "var(--color-elevated)"} stroke="currentColor" strokeWidth={stroke} />;
    case "ring":
      return <circle r={s} fill="none" stroke="currentColor" strokeWidth={stroke} />;
    case "diamond":
      return (
        <polygon
          points={`0,${-s} ${s},0 0,${s} ${-s},0`}
          fill={fill === "none" ? "var(--color-elevated)" : "currentColor"}
          stroke="currentColor"
          strokeWidth={stroke}
        />
      );
    case "square":
      return (
        <rect
          x={-s * 0.85}
          y={-s * 0.85}
          width={s * 1.7}
          height={s * 1.7}
          fill={fill === "none" ? "var(--color-elevated)" : "currentColor"}
          stroke="currentColor"
          strokeWidth={stroke}
        />
      );
    case "triangle":
      return (
        <polygon
          points={`0,${-s} ${s},${s * 0.85} ${-s},${s * 0.85}`}
          fill={fill === "none" ? "var(--color-elevated)" : "currentColor"}
          stroke="currentColor"
          strokeWidth={stroke}
        />
      );
    case "dash":
      return <line x1={-s} y1={0} x2={s} y2={0} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />;
    case "cross":
      return (
        <g stroke="currentColor" strokeWidth={stroke} strokeLinecap="round">
          <line x1={-s} y1={0} x2={s} y2={0} />
          <line x1={0} y1={-s} x2={0} y2={s} />
        </g>
      );
  }
}
