import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import React from "react";
import QuotesTable from "./Quotetable";

const Quotes = () => {
  const { params, version, apply, setFilters, filters } = useServerFilters();
  const searchableFieldOptions = getSearchableFieldsForTable("quotes");

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search Recent events by name"
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={true}
        showDates={false}
      />
      <QuotesTable filterParams={params} version={version} />
    </div>
  );
};

export default Quotes;
