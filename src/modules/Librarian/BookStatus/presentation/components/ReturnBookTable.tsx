"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { createReturnBookColumns } from "./ReturnBookColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";

const ReturnBookTable = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  const handleRenew = () => {};
  const handleReturn = () => {};

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
      <DataTable
        columns={columns}
        data={[]}
        enableSelection={false}
        enableFiltering={false}
        enablePagination={false}
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
