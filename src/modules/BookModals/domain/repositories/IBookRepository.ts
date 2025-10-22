import { CreateBookRequest, CreateBookResponse } from "../entities/BookEntity";
import {
  UpdateBookRequest,
  UpdateBookResponse,
  BookGenresResponse,
  BookGenre,
} from "../entities/UpdateBookEntity";

export interface IBookRepository {
  createBook(request: CreateBookRequest): Promise<CreateBookResponse>;
  updateBook(request: UpdateBookRequest): Promise<any>; // ✅ Backend sends null if accepted
  uploadBookCover(file: File): Promise<string>;
  getGenres(page?: number): Promise<BookGenresResponse>;
  getBookGenres(bookId: number): Promise<BookGenre[]>;
}
