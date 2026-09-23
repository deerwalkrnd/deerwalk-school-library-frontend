"use client";

import { FilterState } from "@/modules/Librarian/BookStatus/domain/entities/filter";
import { useMemo, useState } from "react";
import { toLocalEndOfDay, toLocalYMD } from "@/core/lib/date";

const toYMD = (d?: Date | null) => (d ? toLocalYMD(d) : undefined);
const toEndOfDay = (d?: Date | null) => (d ? toLocalEndOfDay(d) : undefined);

export function useServerFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    searchableField: undefined,
    startDate: null,
    endDate: null,
  });
  const [submittedParams, setSubmittedParams] = useState<{
    searchable_value?: string;
    searchable_field?: string | "name";
    start_date?: string;
    end_date?: string;
  }>({});
  const [version, setVersion] = useState(0);

  const apply = () => {
    const start = toYMD(filters.startDate);
    const startsAfterEnd =
      filters.startDate &&
      filters.endDate &&
      toLocalYMD(filters.startDate) > toLocalYMD(filters.endDate);
    // End of day, so a range ending today still includes today's rows.
    const safeEnd = startsAfterEnd ? undefined : toEndOfDay(filters.endDate);
    const search = filters.search.trim();

    setSubmittedParams({
      searchable_value: search || undefined,
      ...(search
        ? { searchable_field: filters.searchableField || ("name" as const) }
        : {}),
      start_date: start,
      end_date: safeEnd,
    });

    setVersion((v) => v + 1);
  };

  const params = useMemo(() => submittedParams, [submittedParams]);
  return { filters, setFilters, params, version, apply };
}
