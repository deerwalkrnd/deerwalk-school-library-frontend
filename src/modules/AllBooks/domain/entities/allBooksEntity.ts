import type { StaticImageData } from "next/image";

export interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl?: StaticImageData | string;
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

export interface APIBookItem {
  id: string;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: string;
  grade: string;
  cover_image_url: string;
}

export interface APIBooksResponse {
  page: number;
  total: number;
  next: number | null;
  items: APIBookItem[];
}

export interface BookQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  author?: string;
  sortBy?: string;
  sortOrder?: string;
}
