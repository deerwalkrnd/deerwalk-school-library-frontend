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

export interface UseBookFormReturn extends UseFormReturn<FormValues> {
  fields: FieldArrayWithId<FormValues, "copies", "id">[];
  append: (value: Copy | Copy[]) => void;
  remove: (index: number) => void;
  replace: (value: Copy[]) => void;
  onSubmit: SubmitHandler<FormValues>;
  onSubmitWithParams: (
    data: FormValues,
    category?: string,
    genres?: number[],
    grade?: string,
    cover_image_url?: string,
  ) => Promise<void>;
  watchedBookCount: string;
}

export function useBookForm(): UseBookFormReturn {
  const mutation = addBooks();

  const form = useForm<FormValues>({
    defaultValues: {
      bookCount: "1",
      copies: [{ unique_identifier: "" }],
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Validate that at least one copy has a unique_identifier
    const validCopies = (data.copies || [])
      .map((c) => (c.unique_identifier || "").trim())
      .filter(Boolean);

    if (validCopies.length === 0) {
      useToast("error", "At least one book copy must have a unique identifier");
      return;
    }

    const payload = {
      title: (data.title || "").trim(),
      author: (data.author || "").trim(),
      publication: (data.publication || "").trim(),
      isbn: (data.isbn || "").trim(),
      category: "ACADEMIC" as const,
      genres: [0],
      grade: "",
      cover_image_url: "",
      copies: validCopies.map((unique_identifier) => ({ unique_identifier })),
    };

    console.log("Submitting payload:", payload);
    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "Book added successfully");
        reset({
          title: "",
          author: "",
          publication: "",
          isbn: "",
          class: "",
          bookCount: "1",
          copies: [{ unique_identifier: "" }],
        });
        // fileUpload.handleRemoveFile();  Todo: implement this
      },
      onError: (error: any) => {
        useToast("error", error?.message || "Failed to add Book");
      },
    });
  };

  const onSubmitWithParams = async (
    data: FormValues,
    category = "ACADEMIC",
    genres = [0],
    grade = "",
    cover_image_url = "",
  ) => {
    // Validate that at least one copy has a unique_identifier
    const validCopies = (data.copies || [])
      .map((c) => (c.unique_identifier || "").trim())
      .filter(Boolean);

    if (validCopies.length === 0) {
      useToast("error", "At least one book copy must have a unique identifier");
      return;
    }

    const payload = {
      title: (data.title || "").trim(),
      author: (data.author || "").trim(),
      publication: (data.publication || "").trim(),
      isbn: (data.isbn || "").trim(),
      category: category as "ACADEMIC" | "NON_ACADEMIC" | "REFERENCE",
      genres,
      grade,
      cover_image_url,
      copies: validCopies.map((unique_identifier) => ({ unique_identifier })),
    };

    console.log("Submitting payload:", payload);
    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "Book added successfully");
        reset({
          title: "",
          author: "",
          publication: "",
          isbn: "",
          class: "",
          bookCount: "1",
          copies: [{ unique_identifier: "" }],
        });
        // fileUpload.handleRemoveFile();  Todo: implement this
      },
      onError: (error: any) => {
        useToast("error", error?.message || "Failed to add Book");
      },
    });
  };

  return {
    ...form,
    fields,
    append,
    remove,
    replace,
    onSubmit,
    onSubmitWithParams,
    watchedBookCount,
  };
}
