"use client";

import type React from "react";
import { Input } from "@/core/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/presentation/components/ui/select";
import type { BookFilters } from "@/modules/AllBooks/domain/entities/allBooksEntity";
import { Search } from "lucide-react";

interface SearchAndFiltersProps {
  filters: BookFilters;
  onFiltersChange: (filters: BookFilters) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleGenreChange = (value: string) => {
    onFiltersChange({
      ...filters,
      genre: value === "all" ? undefined : value.toUpperCase(),
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [
      typeof filters.sortBy,
      typeof filters.sortOrder,
    ];
    onFiltersChange({ ...filters, sortBy, sortOrder });
  };

  return (
    <div className="flex flex-row lg:gap-8 md:gap-8 gap-6 mb-8">
      <div className="relative flex">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black lg:h-4 lg:w-4 md:w-4 md:h-4 w-3 h-3  " />
        <Input
          placeholder="Search using Title, Author..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 lg:w-110 md:w-95 w-50 lg:text-sm md:text-xs text-[10px] font-medium"
        />
      </div>

      <Select value={filters.genre || "all"} onValueChange={handleGenreChange}>
        <SelectTrigger className="lg:w-46.5 md:w-46.5 w-23 text-[10px] md:text-xs lg:text-xs text-[#7D7D7D] font-medium">
          <SelectValue placeholder="All Books" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Books</SelectItem>
          <SelectItem value="academic">Academic</SelectItem>
          <SelectItem value="fiction">Fiction</SelectItem>
          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="mathematics">Mathematics</SelectItem>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="biography">Biography</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchAndFilters;
