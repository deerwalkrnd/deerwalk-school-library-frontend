import { BorrowRequest } from "../domain/entities/BorrowEntity";
import { IBorrowRepository } from "../domain/repositories/IBorrowRepository";

export class BorrowRepository implements IBorrowRepository {
  private readonly API_URL = {
    BORROW_BOOK: (id: number) => `/api/borrows/${id}`,
    GET_ONE_BORROW: (id: number) => `/api/borrows/${id}`,
    RENEW_BOOK: (id: number) => `/api/borrows/${id}/renew`,
    RETURN_BOOK: (id: number) => `/api/borrows/${id}/return`,
    GET_MANY_BORROWS: (id: number) => `/api/borrows`,
  };

  async borrowBook(id: number, payload: BorrowRequest): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL.BORROW_BOOK}`, {
        method: "POST",
      });
    } catch (error) {}
  }

  async getOneBorrow(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL.GET_ONE_BORROW}`, {
        method: "",
      });
    } catch (error) {}
  }

  async renewBorrowedBook(id: number) {
    try {
      const response = await fetch(`${this.API_URL.RENEW_BOOK}`);
    } catch (error) {}
  }

  async returnBook(id: number) {
    try {
      const response = await fetch(`${this.API_URL.GET_ONE_BORROW}`);
    } catch (error) {}
  }

  async getBookBorrows() {
    try {
      const response = await fetch(`${this.API_URL.GET_ONE_BORROW}`);
    } catch (erorr) {}
  }
}
