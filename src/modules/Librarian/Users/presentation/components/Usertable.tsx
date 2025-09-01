"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useState, useMemo } from "react";
import { IUserColumns } from "../../domain/entities/IUserColumns";
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

const Usertable = () => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [importBooksOpen, setImportBooksOpen] = useState(false);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserColumns | null>(null);
  const [deleteBookOpen, setDeleteBookOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");

  const dummyUsers: IUserColumns[] = [
    {
      student_name: "Krish Devkota",
      roll_no: 101,
      class: 12,
      email: "krish.devkota@example.com",
    },
    {
      student_name: "Sita Sharma",
      roll_no: 102,
      class: 11,
      email: "sita.sharma@example.com",
    },
    {
      student_name: "Ram Thapa",
      roll_no: 103,
      class: 12,
      email: "ram.thapa@example.com",
    },
    {
      student_name: "Anita Karki",
      roll_no: 104,
      class: 10,
      email: "anita.karki@example.com",
    },
    {
      student_name: "Bikash Rai",
      roll_no: 105,
      class: 11,
      email: "bikash.rai@example.com",
    },
    {
      student_name: "Sanjay Basnet",
      roll_no: 106,
      class: 12,
      email: "sanjay.basnet@example.com",
    },
    {
      student_name: "Priya Adhikari",
      roll_no: 107,
      class: 10,
      email: "priya.adhikari@example.com",
    },
    {
      student_name: "Ramesh Shrestha",
      roll_no: 108,
      class: 11,
      email: "ramesh.shrestha@example.com",
    },
    {
      student_name: "Kiran Lama",
      roll_no: 109,
      class: 12,
      email: "kiran.lama@example.com",
    },
    {
      student_name: "Asha Gurung",
      roll_no: 110,
      class: 10,
      email: "asha.gurung@example.com",
    },
  ];

  const handleEdit = (user: IUserColumns) => {
    setSelectedUser(user);
    setEditBookOpen(true);
  };

  const handleDelete = (user: IUserColumns) => {
    // Handle delete logic here
    console.log("Delete user:", user);
    setSelectedUser(user);
    setDeleteBookOpen(true);
  };

  const columns = useMemo(
    () => createUserColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );
  const uniqueClasses = useMemo(() => {
    const classes = [...new Set(dummyUsers.map((user) => user.class))].sort(
      (a, b) => a - b,
    );
    return classes;
  }, [dummyUsers]);

  const filteredData = useMemo(() => {
    return dummyUsers.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        user.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.roll_no.toString().includes(searchTerm);

      const matchesClass =
        selectedClass === "all" || user.class.toString() === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [dummyUsers, searchTerm, selectedClass]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClass("all");
  };

  return (
    <div className="w-full overflow-x-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-row sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, email, or roll number..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10  rounded-md"
            />
          </div>

          <Select
            value={selectedClass}
            onValueChange={(value) => setSelectedClass(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {uniqueClasses.map((classNum) => (
                <SelectItem key={classNum} value={classNum.toString()}>
                  Class {classNum}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        <AddBookModal open={addBookOpen} onOpenChange={setAddBookOpen} />

        <Button
          className="bg-white text-black flex gap-2 justify-center items-center"
          onClick={() => setImportBooksOpen(true)}
        >
          <FileUp />
          Import
        </Button>
        <ImportBooksModal
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
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No students found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default Usertable;
