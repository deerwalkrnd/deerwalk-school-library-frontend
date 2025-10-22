import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateBookUseCase, UpdateBookFormData } from "./UpdateBookUseCase";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { BookRepository } from "../infra/repositories/BookRepository";
import { QueryKeys } from "@/core/lib/queryKeys";

export const useUpdateBook = (repository?: IBookRepository) => {
  const bookRepository = repository || new BookRepository();
  const useCase = new UpdateBookUseCase(bookRepository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: string;
      formData: UpdateBookFormData;
    }) => useCase.execute(id, formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIBRARIANDASHBOARD],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STUDENTDASHBOARD] });
    },
    onError: (error: any) => {
      console.error("Update book error:", error);
    },
  });
};
