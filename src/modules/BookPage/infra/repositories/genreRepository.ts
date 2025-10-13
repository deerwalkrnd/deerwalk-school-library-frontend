import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";
import { GenreRequest } from "../../domain/entities/genreModal";
import IGenresRepository from "../../domain/repositories/IGenreRepository";

export class GenresRepository implements IGenresRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GENRES: "/api/genres",
    UPDATE_GENRE: (id?: number) => `/api/genres/${id}`,
    DELETE_GENRE: (id?: number) => `/api/genres/${id}`,
    GET_GENRE_BY_ID: (id?: number) => `/api/genres/${id}`,
    GET_BOOK_GENRE: (id?: number) => `/api/books/${id}/genres`,
  };

  async getGenres(params?: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<GenreRequest>> {
    try {
      const qp = new URLSearchParams();
      if (params?.page != null) qp.append("page", String(params.page));
      if (params?.limit != null) qp.append("limit", String(params.limit));

      const url = `${this.API_URL.GENRES}${qp.toString() ? `/?${qp.toString()}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch genres", response.status);
      }
      return await response.json();
    } catch (err) {
      if (err instanceof RepositoryError) throw err;
      throw new RepositoryError("Network Error");
    }
  }

  async addGenre(payload: GenreRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.GENRES, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to add genre",
          response.status,
        );
      }
      return await response.json();
    } catch (err) {
      if (err instanceof RepositoryError) throw err;
      throw new RepositoryError("Network error");
    }
  }

  async updateGenre(payload: GenreRequest): Promise<any> {
    try {
      const response = await fetch(this.API_URL.UPDATE_GENRE(payload.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to update genre",
          response.status,
        );
      }
      return await response.json();
    } catch (err) {
      if (err instanceof RepositoryError) throw err;
      throw new RepositoryError("Network error");
    }
  }

  async deleteGenre(id: number): Promise<any> {
    try {
      const response = await fetch(this.API_URL.DELETE_GENRE(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to delete genre",
          response.status,
        );
      }
      const maybeJson = await response.text();
      try {
        return maybeJson ? JSON.parse(maybeJson) : { message: "Genre deleted" };
      } catch {
        return { message: "Genre deleted" };
      }
    } catch (err) {
      if (err instanceof RepositoryError) throw err;
      throw new RepositoryError("Network error");
    }
  }

  async getGenreById(id: number): Promise<GenreRequest> {
    try {
      const response = await fetch(this.API_URL.GET_GENRE_BY_ID(id), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to fetch genre",
          response.status,
        );
      }
      return await response.json();
    } catch (err) {
      if (err instanceof RepositoryError) throw err;
      throw new RepositoryError("Network error");
    }
  }

  async getBookGenre(id: number): Promise<any> {
    try {
      const response = await fetch(this.API_URL.GET_BOOK_GENRE(id), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new RepositoryError(
          error?.detail?.msg || "Failed to fetch genre",
          response.status,
        );
      }
      return await response.json();
    } catch (err) {
      if (err instanceof RepositoryError) throw err;
      throw new RepositoryError("Network error");
    }
  }
}
