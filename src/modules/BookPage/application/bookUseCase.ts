import { BookRepository } from "@/modules/AllBooks/infra/repositories/allBooksRepository";
import { Paginated } from "@/core/lib/Pagination";
import { BookRequest } from "../domain/entities/bookModal";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { RepositoryError } from "@/core/lib/RepositoryError";
import IBooksRepository from "../domain/repositories/IBooksRepository";
import { BooksRepository } from "../infra/repositories/booksRepository";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetBooksUseCase {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(params?: any): Promise<Paginated<BookRequest>> {
    try {
      return await this.BookRepository.getBooks(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class AddBooks {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(payload: BookRequest) {
    try {
      return await this.BookRepository.addBooks(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class UpdateBook {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(payload: BookRequest) {
    try {
      return await this.BookRepository.updateBook(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class DeleteBook {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(id: number): Promise<string> {
    try {
      return await this.BookRepository.deleteBook(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class GetBookById {
  constructor(private BookRepository: IBooksRepository) {}

  async execute(id: number) {
    try {
      return await this.BookRepository.getBookById(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedbacks");
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

export const deleteBooks = () => {
  // continue
};
