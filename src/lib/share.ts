export const CANONICAL_ORIGIN = "https://peddavommond.de";
export const CANONICAL_PATH = "/moeglichkeitensystem";
export const CANONICAL_URL = `${CANONICAL_ORIGIN}${CANONICAL_PATH}`;
export const GITHUB_REPO = "https://github.com/d0npedro/moeglichkeitensystem";

export const SHARE_TITLE = "Was ein Ort einem Körper gibt";
export const SHARE_TEXT =
  "Möglichkeitensystem — freiwillige Doktorarbeit. Dieselbe Mitte, drei Welten.";

/** Always the public path. Never the Vercel-Host. */
export function publicShareUrl(path: "" | "/feld" = "", hash = "") {
  const h = hash && hash.startsWith("#") ? hash : hash ? `#${hash}` : "";
  return `${CANONICAL_URL}${path}${path ? "" : h}`;
}
