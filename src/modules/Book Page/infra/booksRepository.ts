import { RepositoryError } from "@/core/lib/RepositoryError";
import { getCookie } from "@/core/presentation/contexts/AuthContext";
import type { Paginated } from "@/core/lib/Pagination";
import type IBookRepository from "../domain/repositories/IBooksRepository";
import type {
  BookQueryParams,
  BookRequest,
} from "../domain/entities/bookRequest";
import type { BookResponse } from "../domain/entities/bookResponse";
import type { IBookColumns } from "../domain/entities/IBooksColumns";

export class BookRepository implements IBookRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GET_BOOKS: "/api/books",
    CREATE_BOOK: "/api/books",
    UPDATE_BOOK: (id: number) => `/api/books/${id}`,
    DELETE_BOOK: (id: number) => `/api/books/${id}`,
  };

  async getBooks(params?: BookQueryParams): Promise<Paginated<IBookColumns>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }

      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      if (params?.category) {
        queryParams.append("category", params.category);
      }

      if (params?.author) {
        queryParams.append("author", params.author);
      }

      if (params?.grade) {
        queryParams.append("grade", params.grade);
      }

      const url = `${this.API_URL.GET_BOOKS}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;

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
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async createBook(payload: BookRequest): Promise<BookResponse> {
    try {
      const response = await fetch(this.API_URL.CREATE_BOOK, {
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
          error?.detail?.msg || "Failed to create book",
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

  async updateBook(payload: BookRequest): Promise<BookResponse> {
    try {
      const response = await fetch(this.API_URL.UPDATE_BOOK(payload.id!), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.book),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || `Failed to update book with id ${payload.id}`,
          response.status,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async deleteBook(id: number): Promise<void> {
    try {
      const response = await fetch(this.API_URL.DELETE_BOOK(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || `Failed to delete book with id ${id}`,
          response.status,
        );
      }
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }
}
