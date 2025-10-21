"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useState, useMemo, useEffect } from "react";
import { createUserColumns } from "./UserColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import Button from "@/core/presentation/components/Button/Button";
import { CirclePlus, FileUp } from "lucide-react";
import { getUsers } from "../../application/userUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { AddUsersModal } from "./AddUserModal";
import { ImportUsersModal } from "@/modules/Feedback/presentation/components/ImportBooksModal";
import { EditUserModal } from "./EditUserModal";
import { User } from "@/modules/Authentication/domain/entities/userEntity";
import { DeleteModal } from "./DeleteModal";
import Pagination from "@/core/presentation/components/pagination/Pagination";

type FilterParams = {
  searchable_value?: string;
  searchable_field?: string;
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version: number };

const Usertable = ({ filterParams = {}, version }: Props) => {
  const [AddUserOpen, setAddUserOpen] = useState(false);
  const [ImportUsersOpen, setImportUsersOpen] = useState(false);
  const [EditUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [DeleteUserOpen, setDeleteUserOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [
    filterParams.searchable_value,
    filterParams.searchable_field,
    filterParams.start_date,
    filterParams.end_date,
    version,
  ]);

  const { data, isLoading, isError, error } = getUsers({
    page,
    ...filterParams,
  });

  const allData = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };

  const columns = useMemo(
    () => createUserColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center text-red-500">
          Error loading users: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto flex flex-col gap-8">
      <div className="flex justify-end gap-3"></div>
      <div className="flex gap-5">
        <Button
          className="flex flex-row gap-2 justify-center items-center"
          onClick={() => setAddUserOpen(true)}
        >
          <CirclePlus />
          Add Users
        </Button>
        <AddUsersModal open={AddUserOpen} onOpenChange={setAddUserOpen} />

        <Button
          className="bg-white text-black flex gap-2 justify-center items-center"
          onClick={() => setImportUsersOpen(true)}
        >
          <FileUp />
          Import
        </Button>
        <ImportUsersModal
          open={ImportUsersOpen}
          onOpenChange={setImportUsersOpen}
        />
      </div>
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          data={allData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          open={EditUserOpen}
          onOpenChange={setEditUserOpen}
        />
      )}
      {selectedUser && (
        <DeleteModal
          id={selectedUser?.uuid}
          open={DeleteUserOpen}
          onOpenChange={setDeleteUserOpen}
        />
      )}

      <div className="shrink-0 p-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Usertable;
