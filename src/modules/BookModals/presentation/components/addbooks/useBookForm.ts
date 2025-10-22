import { useEffect } from "react";
import {
  useForm,
  UseFormReturn,
  FieldArrayWithId,
  useFieldArray,
} from "react-hook-form";

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
  watchedBookCount: string;
}

export function useBookForm(): UseBookFormReturn {
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

  useEffect(() => {
    if (desiredCount < 0) return;
    const diff = desiredCount - fields.length;
    if (diff > 0) {
      append(Array.from({ length: diff }, () => ({ unique_identifier: "" })));
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) remove(fields.length - 1 - i);
    }
  }, [desiredCount, fields.length, append, remove]);

  return {
    ...form,
    fields,
    append,
    remove,
    replace,
    watchedBookCount,
  };
}
