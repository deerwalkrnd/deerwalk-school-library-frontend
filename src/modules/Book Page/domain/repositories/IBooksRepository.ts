import type { Paginated } from "@/core/lib/Pagination";
import type { BookQueryParams, BookRequest } from "../entities/bookRequest";
import type { BookResponse } from "../entities/bookResponse";
import type { IBookColumns } from "../entities/IBooksColumns";

export default interface IBookRepository {
  getBooks(param?: BookQueryParams): Promise<Paginated<IBookColumns>>;
  createBook(payload: BookRequest): Promise<BookResponse>;
  updateBook(payload: BookRequest): Promise<BookResponse>;
  deleteBook(id: number): Promise<void>;
}
