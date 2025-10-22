import { UseCaseError } from "@/core/lib/UseCaseError";
import { BorrowRequest } from "../domain/entities/BorrowEntity";
import { IBorrowRepository } from "../domain/repositories/IBorrowRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { BorrowRepository } from "../infra/BorrowRepository";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
export class BorrowBookUseCase {
  constructor(private BorrowRepository: IBorrowRepository) {}

  async execute(id: number, payload: BorrowRequest) {
    try {
      return await this.BorrowRepository.borrowBook(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to borrow ");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useBorrowBook = (repository?: IBorrowRepository) => {
  const borrowRepository = repository || new BorrowRepository();
  const useCase = new BorrowBookUseCase(borrowRepository);
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: BorrowRequest }) =>
      useCase.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BORROWBOOKS] });
    },
  });
};
