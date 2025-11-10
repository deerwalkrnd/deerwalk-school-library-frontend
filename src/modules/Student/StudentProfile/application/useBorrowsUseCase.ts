import { useQuery } from "@tanstack/react-query";
import { BorrowsRepository } from "../infra/repositories/BorrowsRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";
import {
  BorrowsResponse,
  GetCurrentBorrowsParams,
} from "../domain/entities/studentProfileEntity";
import { IBorrowsRepository } from "../domain/repositories/IBorrowsRepository";

export class GetCurrentBorrowsUseCase {
  constructor(private borrowsRepository: IBorrowsRepository) {}

  async execute(params?: GetCurrentBorrowsParams): Promise<BorrowsResponse> {
    try {
      return await this.borrowsRepository.getCurrentBorrows(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch currently borrowed books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useCurrentBorrows = (
  params?: GetCurrentBorrowsParams,
  repository?: IBorrowsRepository,
) => {
  const borrowsRepository = repository || new BorrowsRepository();
  const useCase = new GetCurrentBorrowsUseCase(borrowsRepository);

  return useQuery({
    queryKey: [QueryKeys.CURRENT_BORROWS, params],
    queryFn: () => useCase.execute(params),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
