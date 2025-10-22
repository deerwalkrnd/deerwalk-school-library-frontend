import { Paginated } from "@/core/lib/Pagination";
import {
  BorrowRequest,
  RenewRequest,
  ReturnRequest,
} from "../entities/IssueEntity";

export default interface IissueRepository {
  borrowBook(id: number, payload: BorrowRequest): Promise<any>;
  getOneBorrow(id: number): Promise<any>;
  renewBorrowedBook(id: number, payload: RenewRequest): Promise<any>;
  returnBook(id: number, payload: ReturnRequest): Promise<any>;
  getBookBorrows(): Promise<any>;
}
