"use client";
import { cn } from "@/core/lib/utils";
import Button from "@/core/presentation/components/Button/Button";
import { AddRecommendationModal } from "@/modules/Announcement/Recommendation/presentation/components/AddRecommendation";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import RecommendationTable from "./RecommendationTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";

const Recommendations = () => {
  const [isAddRecommendationOpen, setIsAddRecommendationOpen] = useState(false);
  const { filters, apply, params, setFilters, version } = useServerFilters();

  return (
    <div className="flex flex-col">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search using name, book title, designation..."
      />

      <div className="flex flex-col gap-3 mb-4 items-end">
        <div className="flex gap-2">
          <Button
            onClick={() => setIsAddRecommendationOpen(true)}
            className={cn(
              "inline-flex items-center gap-1.5 h-9 px-3",
              "text-sm leading-none tracking-tight text-shadow-sm",
            )}
          >
            <CirclePlus className="w-4 h-4" />
            Add Recommendation
          </Button>
        </div>
      </div>

      <RecommendationTable
        filterParams={new URLSearchParams(params as Record<string, string>)}
        version={version}
      />

      <AddRecommendationModal
        open={isAddRecommendationOpen}
        onOpenChange={(open: boolean) => setIsAddRecommendationOpen(open)}
      />
    </div>
  );
};

export default Recommendations;
