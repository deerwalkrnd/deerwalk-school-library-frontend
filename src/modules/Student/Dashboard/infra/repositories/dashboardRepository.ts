import ILibraryStatsResponse from "../../domain/entities/ILibraryStatsResponse";
import IDashboardRepository from "../../domain/repositories/IDashboardRepository";

export class DashboardRepository implements IDashboardRepository {
  private readonly API_URL = "/api/student-dashboard";
  async getLibraryStats(): Promise<ILibraryStatsResponse> {
    const response = await fetch(this.API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch student dashboard data");
    }
    return response.json();
  }
}
