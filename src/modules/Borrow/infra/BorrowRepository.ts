import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { BorrowRequest } from "../domain/entities/BorrowEntity";
import { IBorrowRepository } from "../domain/repositories/IBorrowRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";

export class BorrowRepository implements IBorrowRepository {
  token = getCookie("authToken");

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
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to add borrow request",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async getOneBorrow(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL.GET_ONE_BORROW}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError("Failed to get borrow request");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async renewBorrowedBook(id: number) {
    try {
      const response = await fetch(`${this.API_URL.RENEW_BOOK}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(`Failed to renew Book `, response.status);
      }
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async returnBook(id: number) {
    try {
      const response = await fetch(`${this.API_URL.GET_ONE_BORROW}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(`Failed to return Book `, response.status);
      }
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async getBookBorrows() {
    try {
      const response = await fetch(`${this.API_URL.GET_ONE_BORROW}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new RepositoryError(`Failed to fetch Borrow requests `);
      }
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }
}
