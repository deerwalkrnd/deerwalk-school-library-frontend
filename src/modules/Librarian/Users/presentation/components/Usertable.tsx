import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React from "react";
import { IUserColumns } from "../../domain/entities/IUserColumns";
import { UserColumns } from "./UserColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";

const Usertable = () => {
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
  return (
    <div className="w-full overflow-x-auto">
      <ScrollArea className="w-full min-w-[600px]">
        <DataTable
          data={dummyUsers}
          columns={UserColumns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
    </div>
  );
};

export default Usertable;
