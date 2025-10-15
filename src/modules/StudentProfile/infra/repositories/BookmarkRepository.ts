import { RepositoryError } from "@/core/lib/RepositoryError";
import type { BookmarksResponse } from "../../domain/entities/studentProfileEntity";
import type { IBookmarksRepository } from "../../domain/repositories/IBookmarkRepository";
import { getCookie } from "@/core/presentation/contexts/AuthContext";

export class BookmarksRepository implements IBookmarksRepository {
  token = getCookie("authToken");

  private readonly API_URL = "/api/bookmarks";

  async getBookmarks(page: number, limit: number): Promise<BookmarksResponse> {
    try {
      const url = new URL(this.API_URL, window.location.origin);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", limit.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
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
}
