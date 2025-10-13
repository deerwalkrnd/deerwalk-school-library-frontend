"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useState, useMemo } from "react";
import { createUserColumns } from "./UserColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import Button from "@/core/presentation/components/Button/Button";
import { CirclePlus, FileUp, Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/presentation/components/ui/select";

import { getUsers } from "../../application/userUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { AddUsersModal } from "./AddUserModal";
import { ImportUsersModal } from "@/modules/Feedback/presentation/components/ImportBooksModal";
import { EditUserModal } from "./EditUserModal";
import { User } from "@/modules/Authentication/domain/entities/userEntity";
import { DeleteModal } from "./DeleteModal";
import Pagination from "@/core/presentation/components/pagination/Pagination";

const Usertable = () => {
  const [AddUserOpen, setAddUserOpen] = useState(false);
  const [ImportUsersOpen, setImportUsersOpen] = useState(false);
  const [EditUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [DeleteUserOpen, setDeleteUserOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<string>("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = getUsers({ page });

  const realData = data?.items ?? [];
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

  // const uniqueRoles = useMemo(() => {
  //   if (!realData || !Array.isArray(realData)) return [];
  //   const roles = [...new Set(realData.map((user) => user.role))].sort();
  //   return roles;
  // }, [realData]);

  const filteredData = useMemo(() => {
    if (!realData || !Array.isArray(realData)) return [];

    return realData.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.roll_number && user.roll_number.includes(searchTerm));

      const matchesRole = selectedRole === "all" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [realData, searchTerm, selectedRole]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-row sm:flex-row gap-8 flex-1">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, email, or roll number..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 rounded-md"
            />
          </div>
        </div>
      </div>
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
          data={filteredData}
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
      {/* {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your search criteria.
        </div>
      )} */}

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

export default Usertable;
