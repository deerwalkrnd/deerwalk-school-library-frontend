"use client";
import Book from "@/modules/AllBooks/presentation/components/BookId/Book";
import Reviews from "@/modules/AllBooks/presentation/components/BookId/Reviews";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  // `id` is string | string[] | undefined; a catch-all segment would give an
  // array, so normalise before handing it to children that expect a string.
  const bookId = Array.isArray(id) ? id[0] : id;

  if (!bookId) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <Book id={bookId} />
      <hr />
      <Reviews id={bookId} />
    </main>
  );
};

export default Page;
