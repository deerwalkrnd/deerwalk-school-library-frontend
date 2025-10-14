import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookRepository } from "@/modules/AllBooks/infra/repositories/allBooksRepository";
import type {
  BookmarkResponse,
  AddBookmarkRequest,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import type { IBookRepository } from "@/modules/AllBooks/domain/repositories/IAllBooksRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";

export class AddBookmarkUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(request: AddBookmarkRequest): Promise<BookmarkResponse> {
    try {
      return await this.bookRepository.addBookmark(request);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to add bookmark");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export class RemoveBookmarkUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(bookmarkId: string): Promise<BookmarkResponse> {
    try {
      return await this.bookRepository.removeBookmark(bookmarkId);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to remove bookmark");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useAddBookmark = (repository?: IBookRepository) => {
  const queryClient = useQueryClient();
  const bookRepository = repository || new BookRepository();
  const useCase = new AddBookmarkUseCase(bookRepository);

  return useMutation({
    mutationFn: (request: AddBookmarkRequest) => useCase.execute(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export const useRemoveBookmark = (repository?: IBookRepository) => {
  const queryClient = useQueryClient();
  const bookRepository = repository || new BookRepository();
  const useCase = new RemoveBookmarkUseCase(bookRepository);

  return useMutation({
    mutationFn: (bookmarkId: string) => useCase.execute(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};
