export const CANONICAL_ORIGIN = "https://peddavommond.de";
export const CANONICAL_PATH = "/moeglichkeitensystem";
export const CANONICAL_URL = `${CANONICAL_ORIGIN}${CANONICAL_PATH}`;
export const GITHUB_REPO = "https://github.com/d0npedro/moeglichkeitensystem";

export const SHARE_TITLE = "Pedda steht in der Mitte seines Studios";
export const SHARE_TEXT =
  "Ehrenfeld. Lichtschalter und Rollladen im Blick. Mensch, Entwickler, Roboter: drei Listen.";

/** Always the public path. Never the Vercel-Host. */
export function publicShareUrl(path: "" | "/feld" | "/schnitt" = "", hash = "", search = "") {
  const h = hash && hash.startsWith("#") ? hash : hash ? `#${hash}` : "";
  const q = search
    ? search.startsWith("?")
      ? search
      : `?${search}`
    : "";
  if (path === "/feld") return `${CANONICAL_URL}/feld${q}`;
  if (path === "/schnitt") return `${CANONICAL_URL}/schnitt${q}`;
  return `${CANONICAL_URL}${q}${h}`;
}
