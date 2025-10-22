import { useQuery } from "@tanstack/react-query";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { BookRepository } from "../infra/repositories/BookRepository";
import { QueryKeys } from "@/core/lib/queryKeys";

export const useGenres = (page: number = 1, repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();

  return useQuery({
    queryKey: [QueryKeys.GENRES, page],
    queryFn: () => bookRepository.getGenres(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useBookGenres = (bookId: number, repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();

  return useQuery({
    queryKey: [QueryKeys.BOOKS, QueryKeys.GENRES, bookId],
    queryFn: () => bookRepository.getBookGenres(bookId),
    enabled: Number.isFinite(bookId) && bookId > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
