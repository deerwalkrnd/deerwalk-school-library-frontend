import { getCookie } from "@/core/presentation/contexts/AuthContext";
import type IBooksRepository from "../../domain/repositories/IBooksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import type { Paginated } from "@/core/lib/Pagination";
import type {
  BookCopiesParams,
  BookCopy,
  BookRequest,
  IBooksColumns,
} from "../../domain/entities/bookModal";
import { QueryParams } from "@/core/lib/QueryParams";

export class BooksRepository implements IBooksRepository {
  token = getCookie("authToken");
  private readonly API_URL = {
    BOOKS: "/api/books",
    BULK_UPLOAD: "/api/books/bulk-upload",
    UPDATE_BOOK: (id: number | undefined) => `/api/books/${id}`,
    DELETE_BOOK: (id: number | undefined) => `/api/books/${id}`,
    GET_BOOK_BY_ID: (id: number | undefined) => `/api/books/${id}`,
    GET_AVAILABLE_COPIES: `/api/books/copies`,
  };

  async getBooks(params?: QueryParams): Promise<Paginated<IBooksColumns>> {
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
        throw error;
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
      const response = await fetch(this.API_URL.UPDATE_BOOK(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to delete book",
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

  async bulkUploadBooks(
    file: File,
  ): Promise<{ inserted: number; skipped: any[] }> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(this.API_URL.BULK_UPLOAD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to upload books",
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

  async getAvailableCopies(
    params?: BookCopiesParams,
  ): Promise<Paginated<BookCopy>> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page !== undefined)
        queryParams.append("page", String(params.page));
      if (params?.limit !== undefined)
        queryParams.append("limit", String(params.limit));
      if (params?.book_id !== undefined)
        queryParams.append("book_id", String(params?.book_id));

      const qs = queryParams.toString();
      const url = `${this.API_URL.GET_AVAILABLE_COPIES}${qs ? `/?${qs}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch available book copies");
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
}
