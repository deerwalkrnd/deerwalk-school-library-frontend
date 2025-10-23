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
import { QueryParams } from "@/core/lib/QueryParams";

export class IssueBookRepository implements IissueRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    BORROW_BOOK: (id: number) => `/api/issues/${id}`,
    GET_ONE_BORROW: (id: number) => `/api/issues/${id}`,
    RENEW_BOOK: (id: number) => `/api/issues/${id}/renew`,
    RETURN_BOOK: (id: number) => `/api/issues/${id}/return`,
    GET_MANY_BORROWS: `/api/issues`,
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

  async getBookBorrows(params?: QueryParams): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page !== undefined)
        queryParams.append("page", String(params.page));
      if (params?.limit !== undefined)
        queryParams.append("limit", String(params.limit));

      if (params?.searchable_value?.trim()) {
        queryParams.append("searchable_value", params.searchable_value.trim());
        if (params?.searchable_field) {
          console.log(params?.searchable_field);
          queryParams.append("searchable_field", params.searchable_field);
        }
      }
      if (params?.start_date)
        queryParams.append("start_date", params.start_date);

      const url = `${this.API_URL.GET_MANY_BORROWS}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;

      const response = await fetch(url, {
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
