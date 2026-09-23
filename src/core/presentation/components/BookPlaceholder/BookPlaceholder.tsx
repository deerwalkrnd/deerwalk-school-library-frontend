"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  bookPlaceholderSvg,
  type BookPlaceholderOptions,
} from "@/core/lib/bookPlaceholder";
import { normalizeCoverUrl } from "@/core/lib/normalizeCoverUrl";

type Props = BookPlaceholderOptions & { className?: string };

/** Renders the placeholder cover inline (so the logo from /public loads normally). */
export function BookPlaceholder({ className, ...opts }: Props) {
  const svg = useMemo(
    () => bookPlaceholderSvg(opts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      opts.title,
      opts.author,
      opts.seed,
      opts.logoSrc,
      opts.palette,
      opts.footer,
    ],
  );
  return (
    <div
      className={className}
      style={{ aspectRatio: "2 / 3", lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

type CoverProps = {
  src?: string | null;
  title: string;
  author?: string;
  id?: string | number;
  className?: string;
  /** Render the real cover with next/image (optimised) instead of a plain <img>. */
  nextImage?: {
    width: number;
    height: number;
    sizes?: string;
    priority?: boolean;
  };
};

/** Shows the real cover when there is one, and falls back to the placeholder if it is missing or fails to load. */
export function BookCover({
  src,
  title,
  author,
  id,
  className,
  nextImage,
}: CoverProps) {
  const [failed, setFailed] = useState(false);
  const url = normalizeCoverUrl(src);
  if (!url || failed) {
    return (
      <BookPlaceholder
        title={title}
        author={author}
        seed={id ?? title}
        className={className}
      />
    );
  }
  if (nextImage) {
    return (
      <Image
        src={url}
        alt={title}
        width={nextImage.width}
        height={nextImage.height}
        sizes={nextImage.sizes}
        priority={nextImage.priority}
        className={className}
        style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={title}
      className={className}
      style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
      onError={() => setFailed(true)}
    />
  );
}
