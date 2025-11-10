import { useServerFilters } from "@/core/hooks/useServerFilters";
import React from "react";
import EventTable from "./EventTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";

const Events = () => {
  const { filters, apply, params, setFilters, version } = useServerFilters();
  const searchableFieldOptions = getSearchableFieldsForTable("events");

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search Recent events by name"
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={false}
        showDates={false}
      />

      <EventTable filterParams={params} version={version} />
    </div>
  );
};

export default Events;
