export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`.replace(/\/{2,}/g, "/");
}

export {
  CANONICAL_ORIGIN,
  CANONICAL_PATH,
  CANONICAL_URL,
  GITHUB_REPO,
} from "./share";
