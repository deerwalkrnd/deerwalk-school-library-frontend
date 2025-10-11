import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IBooksRepository from "../../domain/repositories/IBooksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";
import { BookRequest, IBooksColumns } from "../../domain/entities/bookModal";

export class BooksRepository implements IBooksRepository {
  token = getCookie("authToken");
  private readonly API_URL = {
    BOOKS: "/api/books",
    UPDATE_BOOK: (id: number | undefined) => `/api/books/${id}`,
    DELETE_BOOK: (id: number | undefined) => `/api/books/${id}`,
    GET_BOOK_BY_ID: (id: number | undefined) => `/api/books/${id}`,
  };

  async getBooks(params?: any): Promise<Paginated<IBooksColumns>> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }

      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      const url = `${this.API_URL.BOOKS}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to fetch books", response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network Error");
    }
  }

  async addBooks(payload: BookRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.BOOKS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to add book",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }

  async updateBook(payload: BookRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.UPDATE_BOOK(payload.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to update book",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }

  async deleteBook(id: number): Promise<any> {
    try {
      const response = await fetch(this.API_URL.UPDATE_BOOK(id));
    } catch (error) {}
  }

  async getBookById(id: number): Promise<BookRequest> {
    try {
      const response = await fetch(this.API_URL.GET_BOOK_BY_ID(id), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to fetch book",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }
}
