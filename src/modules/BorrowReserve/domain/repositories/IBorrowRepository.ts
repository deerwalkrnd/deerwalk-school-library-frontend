import {
  BorrowRequest,
  RenewRequest,
  ReturnRequest,
} from "../entities/BorrowEntity";

export interface IBorrowRepository {
  borrowBook(id: number, payload: BorrowRequest): Promise<any>;
  getOneBorrow(id: number): Promise<any>;
  renewBorrowedBook(id: number, payload: RenewRequest): Promise<any>;
  returnBook(id: number, payload: ReturnRequest): Promise<any>;
  getBookBorrows(params?: any): Promise<any>;
}
