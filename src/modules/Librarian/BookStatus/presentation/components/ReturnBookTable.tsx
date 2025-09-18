"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useMemo } from "react";
import { createReturnBookColumns } from "./ReturnBookColumns";

const ReturnBookTable = () => {
  const handleRenew = () => {};
  const handleReturn = () => {};

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
    </div>
  );
};

export default ReturnBookTable;
