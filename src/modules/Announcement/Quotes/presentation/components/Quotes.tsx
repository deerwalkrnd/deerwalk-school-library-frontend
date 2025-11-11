"use client";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import React, { useState } from "react";
import QuotesTable from "./Quotetable";

const Quotes = () => {
  const { params, version, apply, setFilters, filters } = useServerFilters();
  const searchableFieldOptions = getSearchableFieldsForTable("quotes");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row gap-4  lg:items-start">
        <div className="flex-1">
          <FilterBar
            value={filters}
            onChange={setFilters}
            manual
            onSubmit={apply}
            placeholder="Search Recent Quotes By Name"
            searchableFieldOptions={searchableFieldOptions}
            showSearchableFields={false}
            showDates={false}
          />
        </div>
      </div>
      <QuotesTable filterParams={params} version={version} />
    </div>
  );
};

export default Quotes;
