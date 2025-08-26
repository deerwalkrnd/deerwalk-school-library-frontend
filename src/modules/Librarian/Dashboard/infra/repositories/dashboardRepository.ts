import { RepositoryError } from "@/core/lib/RepositoryError";
import ILibraryStatsResponse from "../../domain/entities/ILibraryStatsResponse";
import IDashboardRepository from "../../domain/repositories/IDashboardRepository";

export class DashboardRepository implements IDashboardRepository {
  private readonly API_URL = "/api/student-dashboard";

  async getLibraryStats(): Promise<ILibraryStatsResponse> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch library dashboard data",
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
  async getTopOverdues(): Promise<any[]> {
    try {
      const response = await fetch(`${this.API_URL}/top-overdues`);
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch top overdue books",
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

  async getTopBooksBorrowed(): Promise<any[]> {
    try {
      const response = await fetch(`${this.API_URL}/top-borrowed`);
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch top borrowed books",
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

  async getRecentlyIssuedBooks(): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/recently-issued`);
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch recently issued books",
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
}
