"use client";
import React, { useState } from "react";
import FeedbackTable from "./FeedbackTable";

import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";

const Feedback = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search using Student Name"
      />

      <FeedbackTable filterParams={params} version={version} />
    </div>
  );
};

export default Feedback;
