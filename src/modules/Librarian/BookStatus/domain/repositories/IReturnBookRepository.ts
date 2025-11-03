import { Paginated } from "@/core/lib/Pagination";

export default interface IReturnBookRepository {
  getReturnedBooks(params?: any): Promise<Paginated<any>>;
  renewBook(payload: any): Promise<any>;
  returnBook(payload: any): Promise<any>;
}
