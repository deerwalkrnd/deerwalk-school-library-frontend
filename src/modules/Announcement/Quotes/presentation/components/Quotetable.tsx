// "use client";
// import React, { useState } from "react";
// // import FeedbackTable from "./FeedbackTable";
// import { CirclePlus, Scroll, Search } from "lucide-react";
// import { Input } from "@/core/presentation/components/ui/input";
// import DatePicker from "@/core/presentation/components/date-picker/date-picker";
// import { Label } from "@/core/presentation/components/ui/label";
// import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
// import { cn } from "@/core/lib/utils";
// import Button from "@/core/presentation/components/Button/Button";
// import { AddQuoteModal } from "@/modules/Announcement/Quotes/presentation/components/AddQuote";
// import { ScrollArea } from "@radix-ui/react-scroll-area";
// import { DataTable } from "@/core/presentation/components/DataTable/DataTable";

// const Quotes = () => {
//   const [search, setSearch] = useState("");
//   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
//   const [endDate, setEndDate] = useState<Date | undefined>(undefined);
//   const [isAddEventOpen, setisAddEventOpen] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//       search,
//       startDate,
//       endDate,
//     });
//   };

//   return (
//     <div className="flex flex-col gap-12">
//       <div>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//           <div className="flex flex-row items-center justify-between w-full">
//             <div className="relative flex flex-row items-center">
//               <Search className="absolute left-2 text-gray-400" size={18} />
//               <Input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400 w-96"
//                 placeholder="Search using Student Name"
//               />
//             </div>

//             <Button
//               onClick={() => setisAddEventOpen(true)}
//               className={cn(
//                 "ml-auto flex items-center justify-center gap-1.5 h-9",
//                 "text-sm leading-none tracking-tight text-shadow-sm",
//               )}
//             >
//               <CirclePlus className="w-4 h-4" />
//               Add Quote
//             </Button>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
//             <div className="flex flex-col gap-2">
//               <Label>Start Date</Label>
//               <DatePicker selected={startDate} onSelect={setStartDate} />
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label>End Date</Label>
//               <DatePicker selected={endDate} onSelect={setEndDate} />
//             </div>

//             <ApplyButton
//               type="submit"
//               className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
//             >
//               Apply
//             </ApplyButton>
//           </div>
//         </form>
//       </div>

//       <AddQuoteModal
//         open={isAddEventOpen}
//         onOpenChange={(open) => setisAddEventOpen(open)}
//       />
//     </div>
//   );
// };

// export default Quotes;

"use client";
import React, { useState, useMemo } from "react";
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import Button from "@/core/presentation/components/Button/Button";
import { AddQuoteModal } from "@/modules/Announcement/Quotes/presentation/components/AddQuote";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { cn } from "@/core/lib/utils";
import { createQuoteColumns } from "./QuoteColumns";
import { IQuoteColumns } from "../../domain/entities/IQuoteColumns";

// --- Temporary placeholder data (replace later with backend call)
const mockQuotes: IQuoteColumns[] = [
  {
    id: "0",
    quote:
      "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
    created_at: "2024-10-01T10:00:00Z",
  },
  {
    id: "1",
    quote:
      "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
    created_at: "2024-10-05T11:30:00Z",
  },
  {
    id: "2",
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    created_at: "2024-10-09T09:15:00Z",
  },
];

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [selectedQuote, setSelectedQuote] = useState<IQuoteColumns | null>(
    null,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Pagination placeholders
  const totalPages = 5;
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  // Filter logic
  const filteredData = useMemo(() => {
    return mockQuotes.filter((quote) => {
      const matchesSearch =
        searchTerm === "" ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase());

      const quoteDate = new Date(quote.created_at);
      const withinDateRange =
        (!startDate || quoteDate >= startDate) &&
        (!endDate || quoteDate <= endDate);

      return matchesSearch && withinDateRange;
    });
  }, [searchTerm, startDate, endDate]);

  // --- Action handlers
  const handleEdit = (quote: IQuoteColumns) => {
    console.log("Editing quote:", quote);
    setSelectedQuote(quote);
    setIsEditOpen(true);
  };

  const handleDelete = (quote: IQuoteColumns) => {
    console.log("Deleting quote:", quote);
    setSelectedQuote(quote);
    setIsDeleteOpen(true);
  };

  // --- Columns with action buttons
  const columns = useMemo(
    () => createQuoteColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  return (
    <div className="w-full overflow-x-auto flex flex-col gap-8">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-row gap-8 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by author or quote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rounded-md"
            />
          </div>
        </div>

        {/* Add Quote Button */}
        <Button
          onClick={() => setIsAddQuoteOpen(true)}
          className={cn("flex items-center justify-center gap-2")}
        >
          <CirclePlus className="w-4 h-4" />
          Add Quote
        </Button>

        {/* Add Quote Modal */}
        <AddQuoteModal open={isAddQuoteOpen} onOpenChange={setIsAddQuoteOpen} />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
        <div className="flex flex-col gap-2">
          <Label>Start Date</Label>
          <DatePicker selected={startDate} onSelect={setStartDate} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>End Date</Label>
          <DatePicker selected={endDate} onSelect={setEndDate} />
        </div>

        <ApplyButton
          type="button"
          onClick={() => console.log("Applied filters")}
          className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
        >
          Apply
        </ApplyButton>
      </div>

      {/* Data Table Section */}
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          data={filteredData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />

      {/* Future Modals (edit/delete) */}
      {/* <EditQuoteModal open={isEditOpen} quote={selectedQuote} onOpenChange={setIsEditOpen} /> */}
      {/* <DeleteQuoteModal open={isDeleteOpen} quote={selectedQuote} onOpenChange={setIsDeleteOpen} /> */}
    </div>
  );
};

export default Quotes;
