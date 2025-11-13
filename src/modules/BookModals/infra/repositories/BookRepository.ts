import { RepositoryError } from "@/core/lib/RepositoryError";
import { IBookRepository } from "../../domain/repositories/IBookRepository";
import {
  CreateBookRequest,
  CreateBookResponse,
} from "../../domain/entities/BookEntity";
import {
  UpdateBookRequest,
  BookGenresResponse,
  BookGenre,
} from "../../domain/entities/UpdateBookEntity";
import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { uploadMediaFile } from "@/core/services/fileUpload";

export class BookRepository implements IBookRepository {
  private readonly API_URL = {
    CREATE_BOOK: "/api/books",
    UPDATE_BOOK: (id: string | number) => `/api/books/${id}`,
    GENRES: "/api/genres",
    BOOK_GENRES: "/api/books",
  };

  private getAuthHeaders() {
    const token = getCookie("authToken");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async createBook(request: CreateBookRequest): Promise<CreateBookResponse> {
    try {
      const response = await fetch(this.API_URL.CREATE_BOOK, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request.toJSON()),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new RepositoryError(
          `Failed to create book: ${errorText}`,
          response.status,
        );
      }

      const data = await response.json();

      return {
        success: true,
        message: "Book created successfully",
        bookId: data.id || data.bookId,
      };
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error while creating book");
    }
  }

  async updateBook(request: UpdateBookRequest): Promise<any> {
    try {
      const requestBody = request.toJSON();

      const response = await fetch(this.API_URL.UPDATE_BOOK(request.id), {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to update book",
          response.status,
        );
      }
      const data = await response.json().catch(() => null);
      return data;
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      console.error("Update book error:", error);
      throw new RepositoryError("Network error while updating book");
    }
  }

  async uploadBookCover(file: File): Promise<string> {
    try {
      return await uploadMediaFile(file, { type: "BOOK_COVER" });
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError(
        error?.message || "Network error while uploading cover image",
      );
    }
  }

  async getGenres(page: number = 1): Promise<BookGenresResponse> {
    try {
      const response = await fetch(`${this.API_URL.GENRES}?page=${page}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch genres", response.status);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error while fetching genres");
    }
  }

  async getBookGenres(bookId: number): Promise<BookGenre[]> {
    try {
      const response = await fetch(
        `${this.API_URL.BOOK_GENRES}/${bookId}/genres`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch book genres",
          response.status,
        );
      }

      const data = await response.json();
      return data.genres || [];
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error while fetching book genres");
    }
  }
}
