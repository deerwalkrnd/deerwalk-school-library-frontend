"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { createIssueBookColumns } from "./IssueBookColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";

const IssueBookTable = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  const currentPage = 1;
  const totalPages = 5;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = true;

  const handleDelete = () => {};
  const handleIssue = () => {};
  const columns = useMemo(
    () => createIssueBookColumns(handleIssue, handleDelete),
    [handleIssue, handleDelete],
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

export default IssueBookTable;
