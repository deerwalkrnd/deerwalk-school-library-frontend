import { RepositoryError } from "@/core/lib/RepositoryError";
import ILibraryStatsResponse from "../../domain/entities/ILibraryStatsResponse";
import IDashboardRepository from "../../domain/repositories/IDashboardRepository";
import { getCookie } from "@/core/presentation/contexts/AuthContext";

export class DashboardRepository implements IDashboardRepository {
  token = getCookie("authToken");
  private readonly API_URL = "/api/student-dashboard";

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
          "Failed to fetch student dashboard data",
          response.status,
        );
      }

      const data = await response.json();

      return {
        totalBooksBorrowed: data.borrowed_count,
        totalReturnedBooks: data.returned_books_count,
        overdueBooks: data.overdue_books_count,
        fineLevied: data.fine_levied,
        savedBooks: data.saved_books,
        mostBorrowedCategory: data.most_borrowed_category,
      };
    } catch (error: any) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError(error.message || "Network Error");
    }
  }
}
