import { UseCaseError } from "@/core/lib/UseCaseError";
import { BorrowRequest } from "../domain/entities/BorrowEntity";
import { IBorrowRepository } from "../domain/repositories/IBorrowRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { BorrowRepository } from "../infra/BorrowRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      bookId,
      payload,
    }: {
      id: number;
      bookId: number;
      payload: BorrowRequest;
    }) => useCase.execute(id, payload),
    onSuccess: (data, variables) => {
      const { bookId } = variables;
      const currentData = queryClient.getQueryData([
        QueryKeys.AVAILABLECOPIES,
        { book_id: bookId },
      ]);
      if (currentData) {
        const updatedItems = (currentData as any).items.filter(
          (item: any) => item.id !== variables.id,
        );
        queryClient.setQueryData(
          [QueryKeys.AVAILABLECOPIES, { book_id: bookId }],
          { items: updatedItems },
        );
      }
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.AVAILABLECOPIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOOKS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ISSUES],
      });
    },
  });
};
