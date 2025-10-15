import { UseCaseError } from "@/core/lib/UseCaseError";
import { BorrowRequest } from "../domain/entities/BorrowEntity";
import { IBorrowRepository } from "../domain/repositories/IBorrowRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
export class BorrowBookUseCase {
  constructor(private BorrowRepository: IBorrowRepository) {}

  async execute(id: number, payload: BorrowRequest) {
    try {
      return await this.BorrowRepository.borrowBook(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
