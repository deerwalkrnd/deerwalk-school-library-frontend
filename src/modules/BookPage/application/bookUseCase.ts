import { BookRepository } from "@/modules/AllBooks/infra/repositories/allBooksRepository";
import { Paginated } from "@/core/lib/Pagination";
import {
  BookPayload,
  BookRequest,
  IBooksColumns,
} from "../domain/entities/bookModal";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { RepositoryError } from "@/core/lib/RepositoryError";
import IBooksRepository from "../domain/repositories/IBooksRepository";
import { BooksRepository } from "../infra/repositories/booksRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetBooksUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(params?: any): Promise<Paginated<IBooksColumns>> {
    try {
      return await this.BookRepository.getBooks(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch books");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class AddBooksUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(payload: BookPayload) {
    try {
      return await this.BookRepository.addBooks(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to add book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class UpdateBookUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(payload: BookRequest) {
    try {
      return await this.BookRepository.updateBook(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to update book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class DeleteBookUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(id: number): Promise<string> {
    try {
      return await this.BookRepository.deleteBook(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class GetBookByIdUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(id: number) {
    try {
      return await this.BookRepository.getBookById(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch specified book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const getBooks = (params?: { page?: number; limit?: number }) => {
  const booksRepository = new BooksRepository();

  const useCase = new GetBooksUseCase(booksRepository);
  return useQuery({
    queryKey: [QueryKeys.BOOKS, params?.page, params?.limit],
    queryFn: () => useCase.execute(params),
    retry: 3,
  });
};

export const useDeleteBooks = () => {
  const booksRepository = new BooksRepository();

  const useCase = new DeleteBookUseCase(booksRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export const addBooks = () => {
  const repo = new BooksRepository();
  const useCase = new AddBooksUseCase(repo);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BookPayload) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export const useUpdateBook = () => {
  const booksRepository = new BooksRepository();

  const useCase = new UpdateBookUseCase(booksRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BookPayload) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};
