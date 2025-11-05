import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import TeacherRecommendation from "@/modules/Announcement/Recommendation/presentation/components/RecommendationTable";
import React from "react";

const Recommendation = () => {
  const { filters, apply, params, setFilters, version } = useServerFilters();
  const searchableFieldOptions = getSearchableFieldsForTable("recommendation");

  return (
    <div className="flex flex-col gap-12">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search Recommendations by name"
        searchableFieldOptions={searchableFieldOptions}
        showSearchableFields={false}
        showDates={false}
      />
      <TeacherRecommendation filterParams={params} version={version} />
    </div>
  );
};

export default Recommendation;
