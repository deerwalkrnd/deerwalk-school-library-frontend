"use client";
import React, { useState } from "react";
import FeedbackTable from "./FeedbackTable";

import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";

const Feedback = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  // Get searchable field options for feedback table
  const searchableFieldOptions = getSearchableFieldsForTable("feedback");

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search feedback..."
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={true}
      />

      <FeedbackTable filterParams={params} version={version} />
    </div>
  );
};

export default Feedback;
