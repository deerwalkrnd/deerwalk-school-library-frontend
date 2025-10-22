import type { Paginated } from "@/core/lib/Pagination";
import type { BookRequest, IBooksColumns } from "../entities/bookModal";

export default interface IBooksRepository {
  getBooks(params?: any): Promise<Paginated<IBooksColumns>>;
  addBooks(payload: BookRequest): Promise<any>;
  updateBook(payload: BookRequest): Promise<any>;
  getBookById(id: number): Promise<BookRequest>;
  deleteBook(id: number): Promise<any>;
  bulkUploadBooks(file: File): Promise<{ inserted: number; skipped: any[] }>;
}
