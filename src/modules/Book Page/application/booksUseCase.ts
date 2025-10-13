import { BookRepository } from "../infra/booksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import type { BookResponse } from "../domain/entities/bookResponse";
import type IBookRepository from "../domain/repositories/IBooksRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import type {
  BookQueryParams,
  BookRequest,
} from "../domain/entities/bookRequest";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IBookColumns } from "../domain/entities/IBooksColumns";
import type { Paginated } from "@/core/lib/Pagination";

export class GetBooksUseCase {
  constructor(private BookRepository: IBookRepository) {}

  async execute(params?: BookQueryParams): Promise<Paginated<IBookColumns>> {
    try {
      return await this.BookRepository.getBooks(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch books");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class CreateBookUseCase {
  constructor(private BookRepository: IBookRepository) {}

  async execute(payload: BookRequest): Promise<BookResponse> {
    try {
      return await this.BookRepository.createBook(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to create book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class UpdateBookUseCase {
  constructor(private BookRepository: IBookRepository) {}

  async execute(payload: BookRequest): Promise<BookResponse> {
    try {
      return await this.BookRepository.updateBook(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to update book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class DeleteBookUseCase {
  constructor(private BookRepository: IBookRepository) {}

  async execute(id: number): Promise<void> {
    try {
      return await this.BookRepository.deleteBook(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to delete book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useBooks = (params?: BookQueryParams) => {
  const bookRepository = new BookRepository();
  const useCase = new GetBooksUseCase(bookRepository);
  return useQuery({
    queryKey: [QueryKeys.BOOKS, params],
    queryFn: () => useCase.execute(params),
    retry: 3,
    // staleTime: 1000 * 60, 1 min cache
  });
};

export const useCreateBook = (repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new CreateBookUseCase(bookRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BookRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export const useUpdateBook = (repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new UpdateBookUseCase(bookRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }: { payload: BookRequest }) =>
      useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export const useDeleteBook = (repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new DeleteBookUseCase(bookRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};
