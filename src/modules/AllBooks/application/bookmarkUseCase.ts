import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { BookRepository } from "@/modules/AllBooks/infra/repositories/allBooksRepository";
import type {
  BookmarkResponse,
  AddBookmarkRequest,
  CheckBookmarkRequest,
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

export class CheckBookmarkUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(request: CheckBookmarkRequest): Promise<string | null> {
    try {
      return await this.bookRepository.checkBookmark(request);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to check bookmark");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export class GetAllBookmarksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute() {
    try {
      return await this.bookRepository.getAllBookmarks();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch bookmarks");
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
    onSuccess: (data, variables) => {
      const bookId = variables.book_id;
      queryClient.setQueryData(
        [QueryKeys.BOOKS, "bookmark", bookId],
        data.bookmarkId?.toString() || null,
      );

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOOKMARKS],
        exact: true,
      });
    },
  });
};

export const useRemoveBookmark = (repository?: IBookRepository) => {
  const queryClient = useQueryClient();
  const bookRepository = repository || new BookRepository();
  const useCase = new RemoveBookmarkUseCase(bookRepository);

  return useMutation({
    mutationFn: (bookmarkId: string) => useCase.execute(bookmarkId),
    onSuccess: (data, bookmarkId) => {
      const queryCache = queryClient.getQueryCache();
      const queries = queryCache.findAll({
        queryKey: [QueryKeys.BOOKS, "bookmark"],
      });

      queries.forEach((query) => {
        const cachedBookmarkId = query.state.data;
        if (cachedBookmarkId === bookmarkId) {
          queryClient.setQueryData(query.queryKey, null);
        }
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOOKMARKS],
        exact: true,
      });
    },
  });
};

export const useCheckBookmark = (
  bookId: string,
  repository?: IBookRepository,
) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new CheckBookmarkUseCase(bookRepository);

  return useQuery({
    queryKey: [QueryKeys.BOOKS, "bookmark", bookId],
    queryFn: () => useCase.execute({ book_id: bookId }),
    enabled: !!bookId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useAllBookmarks = (repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new GetAllBookmarksUseCase(bookRepository);

  return useQuery({
    queryKey: [QueryKeys.BOOKMARKS],
    queryFn: () => useCase.execute(),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: "always",
  });
};
