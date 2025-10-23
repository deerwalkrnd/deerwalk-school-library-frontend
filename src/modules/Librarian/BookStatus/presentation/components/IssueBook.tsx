"use client";
import IssueBookTable from "./IssueBookTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsFromColumns } from "@/core/lib/searchableFields";
import { createIssueBookColumns } from "./columns/IssueBookColumns";

const IssueBook = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  const searchableFieldOptions = getSearchableFieldsFromColumns(() =>
    createIssueBookColumns(
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
        placeholder="Search using Student Name, ISBN, Book Title, Author"
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={true}
      />

      <IssueBookTable filterParams={params} version={version} />
    </div>
  );
};

export default IssueBook;
