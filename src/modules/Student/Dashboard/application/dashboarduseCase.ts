import { RepositoryError } from "@/core/lib/RepositoryError";
import ILibraryStatsResponse from "../domain/entities/ILibraryStatsResponse";
import IDashboardRepository from "../domain/repositories/IDashboardRepository";
import { DashboardRepository } from "./../infra/repositories/dashboardRepository";
import { useQuery } from "@tanstack/react-query";
import { UseCaseError } from "@/core/lib/UseCaseError";

export class GetDashboardStatsUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<ILibraryStatsResponse> {
    try {
      return await this.dashboardRepository.getLibraryStats();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError(`Data access failed`);
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
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
