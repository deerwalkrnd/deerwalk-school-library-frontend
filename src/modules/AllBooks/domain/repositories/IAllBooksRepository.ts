import type {
  BookData,
  BooksResponse,
  BookFilters,
  PaginationParams,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";

export interface IBookRepository {
  getAllBooks(
    pagination: PaginationParams,
    filters?: BookFilters,
  ): Promise<BooksResponse>;
  getBookById(id: string): Promise<BookData>;
}
