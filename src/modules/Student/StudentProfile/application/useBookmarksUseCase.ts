import { useQuery } from "@tanstack/react-query";
import { BookmarksRepository } from "../infra/repositories/BookmarkRepository";
import type { IBookmarksRepository } from "../domain/repositories/IBookmarkRepository";
import type {
  BookmarksResponse,
  BookData,
} from "../domain/entities/studentProfileEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetBookmarksUseCase {
  constructor(private bookmarksRepository: IBookmarksRepository) {}

  async execute(page: number, limit: number): Promise<BookmarksResponse> {
    try {
      return await this.bookmarksRepository.getBookmarks(page, limit);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch bookmarks");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useBookmarks = (
  page: number,
  limit: number,
  repository?: IBookmarksRepository,
) => {
  const bookmarksRepository = repository || new BookmarksRepository();
  const useCase = new GetBookmarksUseCase(bookmarksRepository);

  return useQuery({
    queryKey: [QueryKeys.BOOKMARKS, page, limit],
    queryFn: () => useCase.execute(page, limit),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// Helper function to transform API bookmark data to BookData format
export const transformBookmarkToBookData = (
  bookmark: BookmarksResponse["items"][0],
): BookData => {
  return {
    id: bookmark.book.id.toString(),
    title: bookmark.book.title,
    author: bookmark.book.author,
    imageUrl: bookmark.book.cover_image_url,
  };
};
