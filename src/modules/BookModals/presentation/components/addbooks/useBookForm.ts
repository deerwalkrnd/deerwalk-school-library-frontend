import { useEffect } from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  FieldArrayWithId,
  useFieldArray,
} from "react-hook-form";
import { addBooks } from "@/modules/BookPage/application/bookUseCase";
import { useToast } from "@/core/hooks/useToast";

type Copy = { unique_identifier: string };

type FormValues = {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: Copy[];
};

type BookPayload = {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: "ACADEMIC" | "NON_ACADEMIC" | "REFERENCE";
  genres: number[];
  grade: string;
  cover_image_url: string;
  copies: { unique_identifier: string }[];
};

export interface UseBookFormReturn extends UseFormReturn<FormValues> {
  fields: FieldArrayWithId<FormValues, "copies", "id">[];
  append: (value: Copy | Copy[]) => void;
  remove: (index: number) => void;
  replace: (value: Copy[]) => void;
  submitBookData: (payload: BookPayload) => Promise<void>;
  watchedBookCount: string;
}

export function useBookForm(): UseBookFormReturn {
  const mutation = addBooks();
  const form = useForm<FormValues>({
    defaultValues: {
      bookCount: "0",
      copies: [],
    },
  });

  const { register, handleSubmit, control, watch, reset, setValue } = form;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "copies",
  });

  const watchedBookCount = watch("bookCount") || "0";
  const desiredCount = Math.max(0, Number(watchedBookCount) || 0);

  // keep copies length in sync with bookCount
  useEffect(() => {
    if (desiredCount < 0) return;
    const diff = desiredCount - fields.length;
    if (diff > 0) {
      append(Array.from({ length: diff }, () => ({ unique_identifier: "" })));
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) remove(fields.length - 1 - i);
    }
  }, [desiredCount, fields.length, append, remove]);

  const submitBookData = async (payload: BookPayload): Promise<void> => {
    console.log("Submitting book data:", payload);

    return new Promise((resolve, reject) => {
      mutation.mutate(payload, {
        onSuccess: () => {
          useToast("success", "Book added successfully");
          reset({
            title: "",
            author: "",
            publication: "",
            isbn: "",
            class: "",
            bookCount: "0",
            copies: [],
          });
          resolve();
        },
        onError: (error: any) => {
          useToast("error", error?.message || "Failed to add Book");
          reject(error);
        },
      });
    });
  };

  // Removed unused onSubmit function that had hardcoded values
  // AddBook.tsx now properly handles form processing and uses submitBookData directly

  return {
    ...form,
    fields,
    append,
    remove,
    replace,
    submitBookData,
    watchedBookCount,
  };
}
