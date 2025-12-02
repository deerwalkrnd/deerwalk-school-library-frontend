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
import { QueryParams } from "@/core/lib/QueryParams";

export class GetBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(
    pagination: PaginationParams,
    params?: QueryParams,
  ): Promise<BooksResponse> {
    try {
      return await this.bookRepository.getAllBooks(pagination, params);
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
  params?: QueryParams,
  repository?: IBookRepository,
) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new GetBooksUseCase(bookRepository);

  return useQuery({
    queryKey: [QueryKeys.BOOKS, pagination.page, params],
    queryFn: () => useCase.execute(pagination, params),
    staleTime: 1000 * 60 * 2,
    retry: 3,
  });
};
