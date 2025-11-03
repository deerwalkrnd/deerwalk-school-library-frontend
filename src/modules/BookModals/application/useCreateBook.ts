import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBookUseCase, CreateBookFormData } from "./CreateBookUseCase";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { BookRepository } from "../infra/repositories/BookRepository";
import { QueryKeys } from "@/core/lib/queryKeys";

export const useCreateBook = (repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new CreateBookUseCase(bookRepository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CreateBookFormData) => useCase.execute(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIBRARIANDASHBOARD],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STUDENTDASHBOARD] });
    },
    onError: (error: any) => {
      console.error("Create book error:", error);
    },
  });
};
