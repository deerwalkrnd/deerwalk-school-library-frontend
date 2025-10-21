"use client";
import Usertable from "./Usertable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsFromColumns } from "@/core/lib/searchableFields";
import { createUserColumns } from "./UserColumns";

const Users = () => {
  const { filters, setFilters, params, version, apply } = useServerFilters();

  const searchableFieldOptions = getSearchableFieldsFromColumns(() =>
    createUserColumns(
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
        placeholder="Search users..."
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={true}
      />

      <Usertable filterParams={params} version={version} />
    </div>
  );
};

export default Users;
