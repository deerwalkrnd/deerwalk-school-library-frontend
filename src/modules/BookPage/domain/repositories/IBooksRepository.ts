import type { Paginated } from "@/core/lib/Pagination";
import type {
  BookCopiesParams,
  BookCopy,
  BookRequest,
  IBooksColumns,
} from "../entities/bookModal";
import type {
  BookImportResult,
  ImportTemplateFormat,
} from "../entities/bookImport";

export default interface IBooksRepository {
  getBooks(params?: any): Promise<Paginated<IBooksColumns>>;
  addBooks(payload: BookRequest): Promise<any>;
  updateBook(payload: BookRequest): Promise<any>;
  getBookById(id: number): Promise<BookRequest>;
  deleteBook(id: number): Promise<any>;
  bulkUploadBooks(file: File): Promise<BookImportResult>;
  downloadImportTemplate(format: ImportTemplateFormat): Promise<Blob>;
  getAvailableCopies(params?: BookCopiesParams): Promise<Paginated<BookCopy>>;
}
