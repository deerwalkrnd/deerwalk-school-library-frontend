import type { Paginated } from "@/core/lib/Pagination";
import type {
  BookCopiesParams,
  BookPayload,
  BookRequest,
  IBooksColumns,
} from "../domain/entities/bookModal";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { RepositoryError } from "@/core/lib/RepositoryError";
import type IBooksRepository from "../domain/repositories/IBooksRepository";
import { BooksRepository } from "../infra/repositories/booksRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { QueryParams } from "@/core/lib/QueryParams";

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

export class BulkUploadBooksUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(file: File): Promise<{ inserted: number; skipped: any[] }> {
    try {
      return await this.BookRepository.bulkUploadBooks(file);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to bulk upload books");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const getBooks = (params?: QueryParams, key?: unknown) => {
  const booksRepository = new BooksRepository();

  const useCase = new GetBooksUseCase(booksRepository);
  return useQuery({
    queryKey: [QueryKeys.BOOKS, params, key],
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

export const useGetBookById = (id: number) => {
  const booksRepository = new BooksRepository();

  const useCase = new GetBookByIdUseCase(booksRepository);
  return useQuery({
    queryKey: [QueryKeys.BOOKS, id],
    queryFn: () => useCase.execute(id),
    retry: 3,
  });
};

export const useBulkUploadBooks = () => {
  const booksRepository = new BooksRepository();
  const useCase = new BulkUploadBooksUseCase(booksRepository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => useCase.execute(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export class GetAvailableCopiesUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(params?: BookCopiesParams) {
    try {
      return await this.BookRepository.getAvailableCopies(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch available copies");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const getAvailableCopies = (
  params?: BookCopiesParams,
  key?: unknown,
) => {
  const booksRepository = new BooksRepository();

  const useCase = new GetAvailableCopiesUseCase(booksRepository);

  return useQuery({
    queryKey: [QueryKeys.AVAILABLECOPIES, params],
    queryFn: () => {
      return useCase.execute(params);
    },
    retry: 3,
  });
};
