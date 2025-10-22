import { getDefaultClassNames } from "react-day-picker";
import IissueRepository from "../domain/repositories/IIssueBookRepository";
import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { Paginated } from "@/core/lib/Pagination";
import { RepositoryError } from "@/core/lib/RepositoryError";
import {
  BorrowRequest,
  RenewRequest,
  ReturnRequest,
} from "../domain/entities/IssueEntity";

export class IssueBookRepository implements IissueRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    BORROW_BOOK: (id: number) => `/api/issues/${id}`,
    GET_ONE_BORROW: (id: number) => `/api/issues/${id}`,
    RENEW_BOOK: (id: number) => `/api/issues/${id}/renew`,
    RETURN_BOOK: (id: number) => `/api/issues/${id}/return`,
    GET_MANY_BORROWS: () => `/api/issues`,
  };

  async borrowBook(id: number, payload: BorrowRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.BORROW_BOOK(id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
      const response = await fetch(this.API_URL.GET_ONE_BORROW(id), {
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

  async renewBorrowedBook(id: number, payload: RenewRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.RENEW_BOOK(id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError("Failed to renew book", response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async returnBook(id: number, payload: ReturnRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.RETURN_BOOK(id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError("Failed to return book", response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async getBookBorrows(): Promise<any> {
    try {
      const response = await fetch(this.API_URL.GET_MANY_BORROWS(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new RepositoryError("Failed to fetch borrow requests");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }
}
