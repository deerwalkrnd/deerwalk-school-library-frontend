"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useMemo } from "react";
import { createIssueBookColumns } from "./IssueBookColumns";

const IssueBookTable = () => {
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
    </div>
  );
};

export default IssueBookTable;
