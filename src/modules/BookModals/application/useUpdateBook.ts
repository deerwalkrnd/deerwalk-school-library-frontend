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
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIBRARIANDASHBOARD],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STUDENTDASHBOARD] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: [
            QueryKeys.AVAILABLECOPIES,
            { book_id: Number(variables.id) },
          ],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.AVAILABLECOPIES],
        });
      }
    },
    onError: (error: any) => {
      console.error("Update book error:", error);
    },
  });
};
