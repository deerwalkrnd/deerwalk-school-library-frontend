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
}
