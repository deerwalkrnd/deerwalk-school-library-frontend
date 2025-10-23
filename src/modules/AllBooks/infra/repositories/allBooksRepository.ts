import type {
  BooksResponse,
  BookFilters,
  PaginationParams,
  APIBooksResponse,
  BookmarkResponse,
  AddBookmarkRequest,
  BookmarksResponse,
  CheckBookmarkRequest,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import type { IBookRepository } from "@/modules/AllBooks/domain/repositories/IAllBooksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { getCookie } from "@/core/presentation/contexts/AuthContext";

export class BookRepository implements IBookRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GET_BOOKS: "/api/books",
    ADD_BOOKMARK: "/api/bookmarks",
    REMOVE_BOOKMARK: "/api/bookmarks",
    CHECK_BOOKMARK: "/api/bookmarks",
    GET_ALL_BOOKMARKS: "/api/bookmarks",
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
          imageUrl: item.cover_image_url || "/placeholder.png",
          isbn: item.isbn,
          genre: item.category,
        })),
        totalCount: apiData.total,
        totalPages: Math.ceil(apiData.total / pagination.limit),
        currentPage: apiData.page,
        hasNextPage: Boolean(apiData.next),
        hasPreviousPage: apiData.page > 1,
      };
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async addBookmark(request: AddBookmarkRequest): Promise<BookmarkResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }
      const response = await fetch(this.API_URL.ADD_BOOKMARK, {
        method: "POST",
        headers,
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new RepositoryError("Failed to add bookmark", response.status);
      }

      const data = await response.json();

      const bookmarkId = data.id || data.bookmarkId;

      return {
        message: "Bookmark added successfully",
        bookmarkId,
      };
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async removeBookmark(bookmarkId: string): Promise<BookmarkResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }

      const deleteUrl = `${this.API_URL.REMOVE_BOOKMARK}/${bookmarkId}`;

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to remove bookmark", response.status);
      }
      return {
        message: "Bookmark removed successfully",
      };
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async getAllBookmarks(): Promise<BookmarksResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }

      const response = await fetch(this.API_URL.GET_ALL_BOOKMARKS, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch bookmarks", response.status);
      }

      const data: BookmarksResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async checkBookmark(request: CheckBookmarkRequest): Promise<string | null> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }

      const checkUrl = `${this.API_URL.CHECK_BOOKMARK}/${request.book_id}`;
      const response = await fetch(checkUrl, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        return null;
      }

      const data = await response.json();

      return data.status === true ? request.book_id : null;
    } catch (error) {
      return null;
    }
  }
}
