"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import TopOverDuesColumns from "./TopOverDuesColumns";
import { useTopOverdues } from "../../../application/dashboardUseCase";

const TopOverDues = () => {
  const { data = [], isLoading, error } = useTopOverdues();

  if (isLoading) {
    return (
      <div className="w-full">
        <h1 className="font-bold text-xl mb-6">Top Overdues</h1>
        <div className="mt-4 h-80 w-full flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <h1 className="font-bold text-xl mb-6">Top Overdues</h1>
        <div className="mt-4 h-80 w-full flex items-center justify-center">
          <p className="text-red-500">Failed to load data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mb-6">Top Overdues</h1>
      <div className="mt-4 h-80 w-full overflow-x-auto">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            data={data}
            columns={TopOverDuesColumns}
            enableSelection={false}
            enableFiltering={false}
            enablePagination={false}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TopOverDues;
