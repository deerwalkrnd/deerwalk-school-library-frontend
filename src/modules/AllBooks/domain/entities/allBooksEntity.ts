export interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  description?: string;
  isbn?: string;
  publishedYear?: number;
  genre?: string;
  availableCopies?: number;
}

export interface BooksResponse {
  books: BookData[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BookFilters {
  search?: string;
  genre?: string;
  author?: string;
  sortBy?: "title" | "author" | "publishedYear";
  sortOrder?: "asc" | "desc";
}

export interface PaginationParams {
  page: number;
  limit: number;
}
