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
import { AddBookModal } from "@/modules/BookModals/presentation/components/AddBook";
import { ImportBooksModal } from "@/modules/BookModals/presentation/components/ImportBooks";
import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { useUsers } from "../../application/userUseCase";
import { UserRequest } from "../../domain/entities/UserEntity";
import { IUserColumns } from "../../domain/entities/IUserColumns";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { AddUsersModal } from "./AddUserModal";
import { ImportUsersModal } from "@/modules/Feedback/presentation/components/ImportBooksModal";

const Usertable = () => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [importBooksOpen, setImportBooksOpen] = useState(false);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRequest | null>(null);
  const [deleteBookOpen, setDeleteBookOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const { data: realData, isLoading, isError, error } = useUsers({});
  console.log(realData);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setEditBookOpen(true);
  };

  const handleDelete = (user: any) => {
    console.log("Delete user:", user);
    setSelectedUser(user);
    setDeleteBookOpen(true);
  };

  const columns = useMemo(
    () => createUserColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  const uniqueRoles = useMemo(() => {
    if (!realData || !Array.isArray(realData)) return [];
    const roles = [...new Set(realData.map((user) => user.role))].sort();
    return roles;
  }, [realData]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRole("all");
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

          {/* {uniqueRoles.length > 0 && (
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )} */}
        </div>
      </div>

      <div className="flex gap-5">
        <Button
          className="flex flex-row gap-2 justify-center items-center"
          onClick={() => setAddBookOpen(true)}
        >
          <CirclePlus />
          Add Users
        </Button>
        <AddUsersModal open={addBookOpen} onOpenChange={setAddBookOpen} />

        <Button
          className="bg-white text-black flex gap-2 justify-center items-center"
          onClick={() => setImportBooksOpen(true)}
        >
          <FileUp />
          Import
        </Button>
        <ImportUsersModal
          open={importBooksOpen}
          onOpenChange={setImportBooksOpen}
        />
      </div>

      <ScrollArea className="w-full min-w-[600px]">
        <DataTable
          data={filteredData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>

      <EditBookModal
        open={editBookOpen}
        onOpenChange={setEditBookOpen}
        // user={selectedUser}
      />
      <DeleteBookModal open={deleteBookOpen} onOpenChange={setDeleteBookOpen} />

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default Usertable;
