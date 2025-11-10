"use client";
import ReturnBookTable from "./ReturnBookTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";

const ReturnBook = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  const searchableFieldOptions = getSearchableFieldsForTable("returnBooks");

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search using Student Name, Book Title, Author, Book Number"
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={true}
        showDates={false}
      />

      <ReturnBookTable filterParams={params} version={version} />
    </div>
  );
};

export default ReturnBook;
