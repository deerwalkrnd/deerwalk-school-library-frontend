/**
 * Mirrors the API's `PaginatedResponseMany`. These are the only fields the
 * backend sends — anything else has to be derived here, not assumed.
 */
export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  /** Next page number, or null when this is the last page. */
  next: number | null;
};

/** Number of pages a `total` splits into. Always at least 1, so an empty
 * result still reads as "page 1 of 1" rather than "page 1 of 0". */
export const getPageCount = (total: number, limit: number): number =>
  limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;

/** Page-state a paginated list component needs, derived from one response. */
export const getPageState = (
  data: Pick<Paginated<unknown>, "page" | "limit" | "total" | "next"> | undefined,
  fallbackLimit: number,
) => {
  const currentPage = data?.page ?? 1;
  const limit = data?.limit ?? fallbackLimit;
  const total = data?.total ?? 0;

  return {
    currentPage,
    total,
    totalPages: getPageCount(total, limit),
    hasNextPage: data ? data.next !== null : false,
    hasPreviousPage: currentPage > 1,
  };
};
