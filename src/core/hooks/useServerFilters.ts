"use client";

import { FilterState } from "@/modules/Librarian/BookStatus/domain/entities/filter";
import { useMemo, useState } from "react";

const toYMD = (d?: Date | null) =>
  d ? d.toISOString().slice(0, 10) : undefined;

export function useServerFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
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
    const end = toYMD(filters.endDate);
    const safeEnd =
      start && end && new Date(start) > new Date(end) ? undefined : end;
    const search = filters.search.trim();

    setSubmittedParams({
      searchable_value: search || undefined,
      ...(search ? { searchable_field: "name" as const } : {}),
      start_date: start,
      end_date: safeEnd,
    });

    setVersion((v) => v + 1);
  };

  const params = useMemo(() => submittedParams, [submittedParams]);
  return { filters, setFilters, params, version, apply };
}
