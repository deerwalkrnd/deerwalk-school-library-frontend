"use client";
import IssueBookTable from "./IssueBookTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import {
  getSearchableFieldsForTable,
  getSearchableFieldsFromColumns,
} from "@/core/lib/searchableFields";
import { createIssueBookColumns } from "./columns/IssueBookColumns";

const IssueBook = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  // const searchableFieldOptions = getSearchableFieldsFromColumns(() =>
  //   createIssueBookColumns(
  //     () => {},
  //     () => {}
  //   )
  // );

  const searchableFieldOptions = getSearchableFieldsForTable("issueBooks");

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search borrow requests"
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={true}
        showDates={false}
      />

      <IssueBookTable filterParams={params} version={version} />
    </div>
  );
};

export default IssueBook;
