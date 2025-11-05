import { RepositoryError } from "@/core/lib/RepositoryError";
import type ILibraryStatsResponse from "../../domain/entities/ILibraryStatsResponse";
import type IDashboardRepository from "../../domain/repositories/IDashboardRepository";
import { getCookie } from "@/core/presentation/contexts/AuthContext";

export class DashboardRepository implements IDashboardRepository {
  token = getCookie("authToken");
  private readonly API_URL = "/api/librarian-dashboard";

  async getLibraryStats(): Promise<ILibraryStatsResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch library dashboard data",
          response.status,
        );
      }

      const data = await response.json();
      return {
        overdueBooks: data.overdue_books_count,
        totalBooksIssued: data.currently_issued_books_count,
        totalReturnedBooks: data.returned_books_count,
        pendingFines: data.total_pending_fines,
        totalBooks: data.total_books,
        visitors: data.students_count,
      };
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async getTopOverdues(): Promise<any[]> {
    try {
      const response = await fetch(`${this.API_URL}/top-overdues`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch top overdue books",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async getTopBooksBorrowed(): Promise<any[]> {
    try {
      const response = await fetch(`${this.API_URL}/top-borrowed`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch top borrowed books",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async getRecentlyIssuedBooks(): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/recently-issued`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch recently issued books",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }
}
