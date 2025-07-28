import ILibraryStatsResponse from "../domain/entities/ILibraryStatsResponse";
import IDashboardRepository from "../domain/repositories/IDashboardRepository";
import { DashboardRepository } from "./../infra/repositories/dashboardRepository";
import { useQuery } from "@tanstack/react-query";

export class GetDashboardStatsUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<ILibraryStatsResponse> {
    try {
      return await this.dashboardRepository.getLibraryStats();
    } catch (error: any) {
      throw new Error(`Failed to fetch dashboard stats: ${error.message}`);
    }
  }
}

export const useDashboard = (repository?: IDashboardRepository) => {
  const dashboardRepository = repository || new DashboardRepository();
  const useCase = new GetDashboardStatsUseCase(dashboardRepository);

  return useQuery({
    queryKey: ["student-dashboard"],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};
