"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import RecentlyIssuedBooksColumns from "./RecentlyIssuedBooksColumns";
import { useRecentlyIssuedBooks } from "../../../application/dashboardUseCase";

const RecentlyIssuedBooks = () => {
  const { data = [], isLoading, error } = useRecentlyIssuedBooks();

  if (isLoading) {
    return (
      <div className="w-full mb-6">
        <h1 className="font-bold text-xl">Recently Issued Books</h1>
        <div className="mt-4 h-80 w-full flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mb-6">
        <h1 className="font-bold text-xl">Recently Issued Books</h1>
        <div className="mt-4 h-80 w-full flex items-center justify-center">
          <p className="text-red-500">Failed to load data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <h1 className="font-bold text-xl">Recently Issued Books</h1>
      <div className="mt-4 h-80 w-full overflow-x-auto">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            data={data}
            columns={RecentlyIssuedBooksColumns}
            enableSelection={false}
            enableFiltering={false}
            enablePagination={false}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecentlyIssuedBooks;
