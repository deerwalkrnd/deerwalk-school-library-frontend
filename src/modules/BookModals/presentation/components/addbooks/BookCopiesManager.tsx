import { Minus, Plus } from "lucide-react";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldArrayWithId,
} from "react-hook-form";

interface FormValues {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: { unique_identifier: string }[];
}

interface BookCopiesManagerProps {
  register: UseFormRegister<FormValues>;
  fields: FieldArrayWithId<FormValues, "copies", "id">[];
  setValue: UseFormSetValue<FormValues>;
  bookCount: string;
}

const MIN_COPIES = 1;
const MAX_COPIES = 200;

export function BookCopiesManager({
  register,
  fields,
  setValue,
  bookCount,
}: BookCopiesManagerProps) {
  const count = Number(bookCount) || 0;

  const setCount = (value: number | string) => {
    setValue("bookCount", String(value), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const step = (delta: number) =>
    setCount(Math.min(MAX_COPIES, Math.max(MIN_COPIES, count + delta)));

  return (
    <>
      <div>
        <div className="space-y-2">
          <label
            htmlFor="book-count"
            className="block text-sm font-medium text-black"
          >
            Number of Copies
          </label>
          <div className="flex h-12 items-center rounded-lg border border-gray-300 bg-primary/5">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={count <= MIN_COPIES}
              aria-label="Remove a copy"
              className="flex h-full w-12 items-center justify-center rounded-l-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              id="book-count"
              type="number"
              min={MIN_COPIES}
              max={MAX_COPIES}
              className="h-full min-w-0 flex-1 bg-transparent text-center text-sm font-medium focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              {...register("bookCount")}
              onChange={(e) => setCount(e.target.value)}
            />
            <button
              type="button"
              onClick={() => step(1)}
              disabled={count >= MAX_COPIES}
              aria-label="Add a copy"
              className="flex h-full w-12 items-center justify-center rounded-r-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-black">Accession Numbers</p>
        {fields.length === 0 ? (
          <p className="text-sm text-gray-500">
            Set the number of copies to enter their accession numbers.
          </p>
        ) : (
          // Capped height: large copy counts scroll here instead of growing the form
          <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
            {fields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-3">
                <label
                  htmlFor={`copy-${idx}`}
                  className="w-16 shrink-0 text-sm text-gray-600"
                >
                  Book {idx + 1}
                </label>
                <input
                  id={`copy-${idx}`}
                  placeholder={`e.g. BK-${String(idx + 1).padStart(5, "0")}`}
                  className="h-12 min-w-0 flex-1 px-3 rounded-lg border border-gray-300 bg-primary/5 text-sm"
                  {...register(`copies.${idx}.unique_identifier` as const)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
