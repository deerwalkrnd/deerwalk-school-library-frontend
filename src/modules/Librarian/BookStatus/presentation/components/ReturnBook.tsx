"use client";
import ReturnBookTable from "./ReturnBookTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsFromColumns } from "@/core/lib/searchableFields";
import { createReturnBookColumns } from "./columns/ReturnBookColumns";

const ReturnBook = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  const searchableFieldOptions = getSearchableFieldsFromColumns(() =>
    createReturnBookColumns(
      () => {},
      () => {},
    ),
  );

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
      />

      <ReturnBookTable filterParams={params} version={version} />
    </div>
  );
};

export default ReturnBook;
