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
    onFiltersChange({ ...filters, genre: value === "all" ? undefined : value });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [
      typeof filters.sortBy,
      typeof filters.sortOrder,
    ];
    onFiltersChange({ ...filters, sortBy, sortOrder });
  };

  return (
    <div className="flex flex-row gap-8 mb-8">
      <div className="relative flex">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search using Title, Author..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 lg:w-110 md:w-95 w-50"
        />
      </div>

      <Select value={filters.genre || "all"} onValueChange={handleGenreChange}>
        <SelectTrigger className="lg:w-48 md:w-48 w-23">
          <SelectValue placeholder="All Books" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Books</SelectItem>
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
