"use client";
import Book from "@/modules/AllBooks/presentation/components/BookId/Book";
import Reviews from "@/modules/AllBooks/presentation/components/BookId/Reviews";
import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  return (
    <main className="container mx-auto px-4 py-8">
      <Book id={id?.toString()!} />
      <hr />
      <Reviews id={id!.toString()} />
    </main>
  );
};

export default page;
