export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`.replace(/\/{2,}/g, "/");
}

export const CANONICAL_ORIGIN = "https://peddavommond.de";
export const CANONICAL_PATH = "/moeglichkeitensystem";
export const CANONICAL_URL = `${CANONICAL_ORIGIN}${CANONICAL_PATH}`;
