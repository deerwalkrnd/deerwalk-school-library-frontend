import { RepositoryError } from "@/core/lib/RepositoryError";
import ILibraryStatsResponse from "../domain/entities/ILibraryStatsResponse";
import IDashboardRepository from "../domain/repositories/IDashboardRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { DashboardRepository } from "../infra/repositories/dashboardRepository";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetDashboardUseCase {
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
  const useCase = new GetDashboardUseCase(dashboardRepository);

  return useQuery({
    queryKey: [QueryKeys.LIBRARIANDASHBOARD],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 2 * 50,
  });
};
