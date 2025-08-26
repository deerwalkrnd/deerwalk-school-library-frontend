import { Header } from "@/core/presentation/components/Header/Header";
import Usertable from "@/modules/Librarian/Users/presentation/components/Usertable";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-20 px-6 md:px-15 lg:px-25 py-10 w-full">
      <Header title="Users" subtitle="View, edit, and manage users." />
      <Usertable />
    </div>
  );
};

export default page;
