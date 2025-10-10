"use client";

import React, { useState } from "react";
import { BooksTable } from "@/modules/BookPage/presentation/components/BooksTable";
import { CirclePlus, FileUp } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { AddBookModal } from "@/modules/BookModals/presentation/components/AddBook";
import { mockBooks } from "@/modules/BookPage/data/bookData";
import { AddGenreModal } from "@/modules/BookModals/presentation/components/AddGenre";
import { ImportBooksModal } from "@/modules/BookModals/presentation/components/ImportBooks";
import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import { Header } from "@/core/presentation/components/Header/Header";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import Books from "@/modules/BookPage/presentation/components/Books";

// import { AddQuoteModal } from "@/modules/AnnouncementModals/presentation/components/AddQuote";

const page = () => {
  return (
    <div className="flex flex-col gap-20 px-6 md:px-15 lg:px-25 py-10 w-full">
      <Header title="Books" subtitle="Search, Add, Update or Delete Books" />
      <Books />
    </div>
  );
};

export default page;
