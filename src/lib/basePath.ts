export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://everydaydata.show";

/** Prefix an internal path with the base path */
export function url(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Build a full canonical URL */
export function canonical(path: string): string {
  return `${SITE_URL}${path}`;
}
