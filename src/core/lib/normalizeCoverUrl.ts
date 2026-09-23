/**
 * Returns the cover URL when it can point at a real image, or null when the
 * value only pretends to be a cover, so callers can show the placeholder.
 *
 * Treated as "no cover":
 * - null / undefined, empty or whitespace-only strings
 * - the literal strings "null", "None", "undefined" (case-insensitive)
 * - a URL that stops at the media folder or one of its upload subfolders
 *   (e.g. ".../media/" or ".../media/book-cover/") with no file name
 * - the frontend's old default image, "/placeholder.png"
 */
const EMPTY_WORDS = new Set(["null", "none", "undefined"]);

// Upload subfolders written by the backend's LocalFileService.
const MEDIA_FOLDERS = new Set([
  "media",
  "book-cover",
  "profile-picture",
  "event-banners",
  "misc",
]);

const DEFAULT_IMAGES = new Set(["/placeholder.png", "placeholder.png"]);

export function normalizeCoverUrl(url?: string | null): string | null {
  if (typeof url !== "string") return null;
  const value = url.trim();
  if (!value || EMPTY_WORDS.has(value.toLowerCase())) return null;

  const path = value.split(/[?#]/)[0];
  if (DEFAULT_IMAGES.has(path)) return null;
  if (path.endsWith("/")) return null;

  const lastSegment = path.split("/").pop()?.toLowerCase() ?? "";
  if (MEDIA_FOLDERS.has(lastSegment)) return null;

  return value;
}
