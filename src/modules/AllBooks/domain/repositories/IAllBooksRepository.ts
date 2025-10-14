import type {
  BooksResponse,
  BookFilters,
  PaginationParams,
  AddBookmarkRequest,
  BookmarkResponse,
  BookmarksResponse,
  CheckBookmarkRequest,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";

export interface IBookRepository {
  getAllBooks(
    pagination: PaginationParams,
    filters?: BookFilters,
  ): Promise<BooksResponse>;
  addBookmark(request: AddBookmarkRequest): Promise<BookmarkResponse>;
  removeBookmark(bookmarkId: string): Promise<BookmarkResponse>;
  checkBookmark(request: CheckBookmarkRequest): Promise<string | null>;
  getAllBookmarks(): Promise<BookmarksResponse>;
}
