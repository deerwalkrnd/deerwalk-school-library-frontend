import type { BookmarksResponse } from "../entities/studentProfileEntity";

export interface IBookmarksRepository {
  getBookmarks(page: number, limit: number): Promise<BookmarksResponse>;
}
