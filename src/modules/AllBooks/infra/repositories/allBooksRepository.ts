import type {
  BookData,
  BooksResponse,
  BookFilters,
  PaginationParams,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import type { IBookRepository } from "@/modules/AllBooks/domain/repositories/IAllBooksRepository";

export class BookRepository implements IBookRepository {
  private readonly API_URL = "/api/books";

  async getAllBooks(
    pagination: PaginationParams,
    filters?: BookFilters,
  ): Promise<BooksResponse> {
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
    });

    if (filters?.search) params.append("search", filters.search);
    if (filters?.genre) params.append("genre", filters.genre);
    if (filters?.author) params.append("author", filters.author);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

    const response = await fetch(`${this.API_URL}?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json();
  }

  async getBookById(id: string): Promise<BookData> {
    const response = await fetch(`${this.API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    return response.json();
  }
}
