import { useQuery } from "@tanstack/react-query";
import { BookRepository } from "@/modules/AllBooks/infra/repositories/allBooksRepository";
import type {
  BooksResponse,
  BookFilters,
  PaginationParams,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import type { IBookRepository } from "@/modules/AllBooks/domain/repositories/IAllBooksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(
    pagination: PaginationParams,
    filters?: BookFilters,
  ): Promise<BooksResponse> {
    try {
      return await this.bookRepository.getAllBooks(pagination, filters);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useBooks = (
  pagination: PaginationParams,
  filters?: BookFilters,
  repository?: IBookRepository,
) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new GetBooksUseCase(bookRepository);

  return useQuery({
    queryKey: [QueryKeys.BOOKS, pagination.page, filters],
    queryFn: () => useCase.execute(pagination, filters),
    staleTime: 1000 * 60 * 2,
    retry: 3,
  });
};
