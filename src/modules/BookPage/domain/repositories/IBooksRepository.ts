import { Paginated } from "@/core/lib/Pagination";
import { BookRequest, IBooksColumns } from "../entities/bookModal";

export default interface IBooksRepository {
  getBooks(params?: any): Promise<Paginated<IBooksColumns>>;
  //   bulkUploadBooks(): Promise<any>;
  addBooks(payload: BookRequest): Promise<any>;
  updateBook(payload: BookRequest): Promise<any>;
  getBookById(id: number): Promise<BookRequest>;
  deleteBook(id: number): Promise<any>;
}
