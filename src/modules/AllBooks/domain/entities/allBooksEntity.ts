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

export interface BookmarkResponse {
  message: string;
  bookmarkId?: string;
}

export interface AddBookmarkRequest {
  book_id: string;
}

export interface BookmarkItem {
  id: number;
  user_id: string;
  book_id: number;
  user: {
    uuid: string;
    name: string;
    roll_number: string;
    email: string;
    role: string;
    graduating_year: string;
    image_url: string;
    user_metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
  };
  book: {
    id: number;
    title: string;
    author: string;
    publication: string;
    isbn: string;
    category: string;
    grade: string;
    cover_image_url: string;
  };
}

export interface BookmarksResponse {
  page: number;
  total: number;
  next: number;
  items: BookmarkItem[];
}

export interface CheckBookmarkRequest {
  book_id: string;
}

export interface CheckBookmarkResponse {
  bookmarkId: string | null;
}
