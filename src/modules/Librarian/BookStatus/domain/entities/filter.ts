import { toLocalEndOfDay, toLocalYMD } from "@/core/lib/date";

export type FilterState = {
  search: string;
  searchableField?: string;
  startDate?: Date | null;
  endDate?: Date | null;
};

export type FilterParams = {
  q?: string;
  searchableField?: string;
  startDate?: string;
  endDate?: string;
};

export function toParams(f: FilterState): FilterParams {
  const startDate = f.startDate ? toLocalYMD(f.startDate) : undefined;
  // End of day, so a range ending today still includes today's rows.
  const endDate = f.endDate ? toLocalEndOfDay(f.endDate) : undefined;

  if (
    f.startDate &&
    f.endDate &&
    toLocalYMD(f.startDate) > toLocalYMD(f.endDate)
  ) {
    return {
      q: f.search?.trim() || undefined,
      searchableField: f.searchableField,
      startDate,
      endDate: undefined,
    };
  }
  return {
    q: f.search?.trim() || undefined,
    searchableField: f.searchableField,
    startDate,
    endDate,
  };
}
