export type FilterState = {
  search: string;
  startDate?: Date | null;
  endDate?: Date | null;
};

export type FilterParams = {
  q?: string;
  startDate?: string;
  endDate?: string;
};

export function toParams(f: FilterState): FilterParams {
  const startDate = f.startDate
    ? f.startDate.toISOString().slice(0, 10)
    : undefined;
  const endDate = f.endDate ? f.endDate.toISOString().slice(0, 10) : undefined;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { q: f.search?.trim() || undefined, startDate, endDate: undefined };
  }
  return { q: f.search?.trim() || undefined, startDate, endDate };
}
