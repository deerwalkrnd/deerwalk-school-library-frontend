/**
 * Deerwalk Sifal School — dynamic book-cover placeholder.
 *
 * Builds an SVG cover (2:3 ratio) showing the school logo and the book title.
 * The colour is picked from a fixed palette by hashing the book's id (or title),
 * so every book gets a stable colour and neighbouring books look different.
 *
 * No dependencies. Works in the browser, in Next.js server components and in Node.
 */

export type CoverPalette = {
  name: string;
  bg: string; // main cover colour (white text must be readable on it)
  shade: string; // darker tone for the spine
  accent: string; // small highlight bar / rings
};

export const COVER_PALETTES: CoverPalette[] = [
  { name: "deerwalk-blue", bg: "#0F5288", shade: "#0A3A61", accent: "#7FB8E6" },
  { name: "forest", bg: "#2F6B3F", shade: "#1F4A2B", accent: "#A8D5A2" },
  { name: "maroon", bg: "#7D2330", shade: "#561720", accent: "#F2A7A0" },
  { name: "plum", bg: "#5E2D72", shade: "#401D4F", accent: "#D4B0E8" },
  { name: "teal", bg: "#0D6B6E", shade: "#084A4C", accent: "#8FE0DA" },
  { name: "burnt-orange", bg: "#A94F16", shade: "#7A380E", accent: "#FFD08A" },
  { name: "slate", bg: "#34495E", shade: "#243342", accent: "#B7C6D6" },
  { name: "indigo", bg: "#2F3C8F", shade: "#202A66", accent: "#AEB8F5" },
  { name: "rose", bg: "#9A2F5C", shade: "#6E1F41", accent: "#FFB8D2" },
  { name: "olive", bg: "#5E6420", shade: "#424613", accent: "#E3E89A" },
  { name: "charcoal", bg: "#3A3A40", shade: "#26262B", accent: "#F2C14E" },
  { name: "ocean", bg: "#1B5E8C", shade: "#12425F", accent: "#FFD166" },
];

export type BookPlaceholderOptions = {
  title: string;
  /** Optional line under the title (author name). */
  author?: string;
  /** What decides the colour. Pass the book id so two copies of the same title can differ; defaults to the title. */
  seed?: string | number;
  /** URL of the logo image. In Next.js put the file in /public and use "/deerwalk-sifal-logo.png". */
  logoSrc?: string;
  /** Force a specific palette (by index or name) instead of hashing. */
  palette?: number | string;
  /** Small text at the bottom of the cover. Set "" to hide. */
  footer?: string;
};

const W = 400;
const H = 600;

/** FNV-1a 32-bit hash — small, fast, stable across runtimes. */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function pickPalette(
  seed: string,
  forced?: number | string,
): CoverPalette {
  if (typeof forced === "number")
    return COVER_PALETTES[
      ((forced % COVER_PALETTES.length) + COVER_PALETTES.length) %
        COVER_PALETTES.length
    ];
  if (typeof forced === "string") {
    const p = COVER_PALETTES.find((x) => x.name === forced);
    if (p) return p;
  }
  return COVER_PALETTES[
    hash(seed.trim().toLowerCase()) % COVER_PALETTES.length
  ];
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Greedy word wrap by estimated character width; long words are hard-split. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text
    .trim()
    .split(/\s+/)
    .flatMap((w) => {
      if (w.length <= maxChars) return [w];
      const parts: string[] = [];
      for (let i = 0; i < w.length; i += maxChars - 1)
        parts.push(
          w.slice(i, i + maxChars - 1) +
            (i + maxChars - 1 < w.length ? "-" : ""),
        );
      return parts;
    });
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length <= maxChars) line = next;
    else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last.length > maxChars - 1) last = last.slice(0, -1);
    kept[maxLines - 1] = last.replace(/[\s,.;:-]+$/, "") + "…";
    return kept;
  }
  return lines;
}

/** Font size steps down as titles get longer. */
function titleMetrics(title: string) {
  const n = title.length;
  if (n <= 14) return { size: 44, maxLines: 3 };
  if (n <= 28) return { size: 38, maxLines: 4 };
  if (n <= 50) return { size: 32, maxLines: 5 };
  if (n <= 80) return { size: 27, maxLines: 6 };
  return { size: 23, maxLines: 7 };
}

export function bookPlaceholderSvg(opts: BookPlaceholderOptions): string {
  const title = (opts.title || "Untitled").trim() || "Untitled";
  const seed = String(opts.seed ?? title);
  const p = pickPalette(seed, opts.palette);
  const logo = opts.logoSrc ?? "/deerwalk-sifal-logo.png";
  const footer = opts.footer ?? "LIBRARY";
  const uid = "bp" + hash(seed + p.name).toString(36); // unique ids so many covers can sit on one page

  // Title block
  const { size, maxLines } = titleMetrics(title);
  const textWidth = 310;
  const maxChars = Math.max(6, Math.floor(textWidth / (size * 0.5)));
  const lines = wrap(title, maxChars, maxLines);
  const lineH = size * 1.18;

  const authorSize = 17;
  const hasAuthor = !!opts.author?.trim();
  const blockH = lines.length * lineH + (hasAuthor ? 22 + authorSize : 0);

  // Title area sits between the logo card (ends y=170) and the footer (starts ~y=540)
  const areaTop = 200;
  const areaBottom = 525;
  const top = areaTop + Math.max(0, (areaBottom - areaTop - blockH) / 2);
  const cx = 212; // a little right of centre to balance the spine

  const titleTspans = lines
    .map(
      (l, i) =>
        `<tspan x="${cx}" y="${(top + size * 0.9 + i * lineH).toFixed(1)}">${esc(l)}</tspan>`,
    )
    .join("");

  const accentY = top - 22;
  const authorY = top + lines.length * lineH + 22 + authorSize * 0.4;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(title)}">
  <defs>
    <linearGradient id="${uid}-sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="0.55" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.22"/>
    </linearGradient>
    <clipPath id="${uid}-clip"><rect width="${W}" height="${H}" rx="6"/></clipPath>
  </defs>
  <g clip-path="url(#${uid}-clip)">
    <rect width="${W}" height="${H}" fill="${p.bg}"/>
    <circle cx="${W - 10}" cy="${H - 20}" r="190" fill="none" stroke="${p.accent}" stroke-opacity="0.16" stroke-width="2"/>
    <circle cx="${W - 10}" cy="${H - 20}" r="140" fill="none" stroke="${p.accent}" stroke-opacity="0.12" stroke-width="2"/>
    <circle cx="${W - 10}" cy="${H - 20}" r="90" fill="${p.accent}" fill-opacity="0.07"/>
    <rect width="${W}" height="${H}" fill="url(#${uid}-sheen)"/>
    <rect width="20" height="${H}" fill="${p.shade}"/>
    <rect x="24" width="2" height="${H}" fill="#ffffff" fill-opacity="0.18"/>

    <rect x="46" y="40" width="330" height="130" rx="16" fill="#ffffff"/>
    <image href="${esc(logo)}" xlink:href="${esc(logo)}" x="62" y="54" width="298" height="102" preserveAspectRatio="xMidYMid meet"/>

    <rect x="${cx - 24}" y="${accentY.toFixed(1)}" width="48" height="4" rx="2" fill="${p.accent}"/>
    <text text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${size}" fill="#ffffff">${titleTspans}</text>
    ${hasAuthor ? `<text x="${cx}" y="${authorY.toFixed(1)}" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="${authorSize}" fill="#ffffff" fill-opacity="0.85">${esc(wrap(opts.author!.trim(), 30, 1)[0])}</text>` : ""}

    ${footer ? `<text x="${cx}" y="${H - 34}" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="${p.accent}" fill-opacity="0.9">${esc(footer)}</text>` : ""}
  </g>
</svg>`;
}

/** Data URL version, handy for <img src>, CSS backgrounds or <Image unoptimized>.
 *  Note: an <img> can't load a logo from another URL inside an SVG, so pass the logo as a data URL here
 *  (see logoDataUrl in the README), or use the inline <BookPlaceholder> component instead. */
export function bookPlaceholderDataUrl(opts: BookPlaceholderOptions): string {
  return (
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(bookPlaceholderSvg(opts))
  );
}
