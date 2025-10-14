import type {
  BooksResponse,
  BookFilters,
  PaginationParams,
  APIBooksResponse,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import type { IBookRepository } from "@/modules/AllBooks/domain/repositories/IAllBooksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { getCookie } from "@/core/presentation/contexts/AuthContext";

export class BookRepository implements IBookRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GET_BOOKS: "/api/books",
  };

  async getAllBooks(
    pagination: PaginationParams,
    filters?: BookFilters,
  ): Promise<BooksResponse> {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (filters?.search) params.append("search", filters.search);
      if (filters?.genre) params.append("category", filters.genre);
      if (filters?.author) params.append("author", filters.author);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }

      const response = await fetch(`${this.API_URL.GET_BOOKS}?${params}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch books", response.status);
      }

      const apiData: APIBooksResponse = await response.json();

      return {
        books: apiData.items.map((item) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          imageUrl: item.cover_image_url,
          isbn: item.isbn,
          genre: item.category,
          description: undefined,
          publishedYear: undefined,
          availableCopies: undefined,
        })),
        totalCount: apiData.total,
        totalPages: Math.ceil(apiData.total / pagination.limit),
        currentPage: apiData.page,
        hasNextPage: apiData.next !== null,
        hasPreviousPage: apiData.page > 1,
      };
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }
}
