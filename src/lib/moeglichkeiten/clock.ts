import type { TimeOfDay } from "./types";

export function timeFromClock(date: Date = new Date()): TimeOfDay {
  const h = date.getHours();
  if (h >= 7 && h < 11) return "morgen";
  if (h >= 11 && h < 17) return "tag";
  if (h >= 17 && h < 22) return "abend";
  return "nacht";
}

export function clockLabel(date: Date = new Date()): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function timeLabel(time: TimeOfDay): string {
  if (time === "morgen") return "Morgen";
  if (time === "tag") return "Tag";
  if (time === "abend") return "Abend";
  return "Nacht";
}
