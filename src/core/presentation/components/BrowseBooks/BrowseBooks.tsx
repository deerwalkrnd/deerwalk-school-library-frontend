import React from "react";
import BookModal from "../Book/BookModal";

const BrowseBooks = () => {
  return (
    <div className="min-h-100">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium ">Browse Books</h1>
        <h2 className="font-medium text-sm md:text-base">
          Start Exploring - There's something for everyone
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto">
        <BookModal />
      </div>
    </div>
  );
};

export default BrowseBooks;
