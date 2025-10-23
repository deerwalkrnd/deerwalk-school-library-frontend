"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { createReturnBookColumns } from "./columns/ReturnBookColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { RenewBookModal } from "./modals/RenewBookModal";
import { ReturnBookModal } from "./modals/ReturnBookModal";

interface ReturnBookTableProps {
  filterParams: any;
  version: number;
}

const ReturnBookTable: React.FC<ReturnBookTableProps> = ({
  filterParams,
  version,
}) => {
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [openRenewModal, setOpenRenewModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filterParams, version]);

  const data: any = [
    // ... (your existing data array)
  ];

  const handleRenew = () => {
    setOpenRenewModal(true);
  };

  const handleReturn = () => {
    setOpenReturnModal(true);
  };

  const currentPage = 1;
  const totalPages = 5;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = true;

  const columns = useMemo(
    () => createReturnBookColumns(handleRenew, handleReturn),
    [handleRenew, handleReturn],
  );

  return (
    <div>
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          columns={columns}
          data={data as any}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      <RenewBookModal onOpenChange={setOpenRenewModal} open={openRenewModal} />
      <ReturnBookModal
        onOpenChange={setOpenReturnModal}
        open={openReturnModal}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ReturnBookTable;
