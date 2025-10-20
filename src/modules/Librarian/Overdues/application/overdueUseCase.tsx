import { useQuery } from "@tanstack/react-query";
import {
  OverdueResponse,
  PaginationParams,
} from "../domain/entities/overdueModal";
import { IOverdueRepository } from "../domain/repositories/IOverdueRepositories";
import { OverdueRepository } from "../infra/repositories/overdueRepository";

export class GetOverDuesUseCase {
  constructor(private overdueRepository: IOverdueRepository) {}

  async execute(pagination: PaginationParams): Promise<OverdueResponse> {
    try {
      return await this.overdueRepository.getAllOverdues(pagination);
    } catch (error: any) {
      throw new Error(`Failed to fetch overdues: ${error.message}`);
    }
  }
}

export const useOverDues = (
  pagination: PaginationParams,
  repository?: IOverdueRepository,
) => {
  const overdueRepository = repository || new OverdueRepository();
  const useCase = new GetOverDuesUseCase(overdueRepository);
  return useQuery({
    queryKey: ["overdues", pagination],
    queryFn: () => useCase.execute(pagination),
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
