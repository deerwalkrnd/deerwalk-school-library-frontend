import OverViewModal from "@/modules/Librarian/Dashboard/presentation/components/OverViewModal";
import RecentlyIssuedBooks from "@/modules/Librarian/Dashboard/presentation/components/RecentlyIssuedBooks/RecentlyIssuedBooks";
import TopBooksBorrowed from "@/modules/Librarian/Dashboard/presentation/components/TopBooksBorrowed/TopBooksBorrowed";
import TopOverDues from "@/modules/Librarian/Dashboard/presentation/components/TopOverDues/TopOverDues";
import React from "react";

const page = () => {
  //todo:fix vars
  return (
    <div className="flex flex-col gap-20 px-6 md:px-15 lg:px-25 py-10">
      <div>
        <h1 className="font-bold text-2xl mb-2">User Summary</h1>
        <h3 className="text-xs">Find insights about the users.</h3>
      </div>
      <OverViewModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
        <div>
          <TopOverDues />
        </div>
        <div>
          <TopBooksBorrowed />
        </div>
        <div className="md:col-span-2">
          <RecentlyIssuedBooks />
        </div>
      </div>
    </div>
  );
};

export default page;
