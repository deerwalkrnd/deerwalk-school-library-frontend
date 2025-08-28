import { useQuery } from "@tanstack/react-query";
import { BookRepository } from "@/modules/AllBooks/infra/repositories/allBooksRepository";
import type {
  BooksResponse,
  BookFilters,
  PaginationParams,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import type { IBookRepository } from "@/modules/AllBooks/domain/repositories/IAllBooksRepository";

export class GetBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(
    pagination: PaginationParams,
    filters?: BookFilters,
  ): Promise<BooksResponse> {
    try {
      return await this.bookRepository.getAllBooks(pagination, filters);
    } catch (error: any) {
      throw new Error(`Failed to fetch books: ${error.message}`);
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
    queryKey: ["books", pagination, filters],
    queryFn: () => useCase.execute(pagination, filters),
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
