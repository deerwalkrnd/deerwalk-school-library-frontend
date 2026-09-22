import { ReactNode } from "react";
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
  /** Rendered beside the count input (e.g. the Class / Genre field). */
  leading?: ReactNode;
}

export function BookCopiesManager({
  register,
  fields,
  setValue,
  leading,
}: BookCopiesManagerProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {leading}
        <div className="flex flex-col justify-start gap-2">
          <label
            htmlFor="book-count"
            className="text-sm font-medium text-black"
          >
            How many books are you uploading?
          </label>
          <div className="flex items-center gap-2">
            <input
              id="book-count"
              type="number"
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-sm font-medium"
              {...register("bookCount")}
              onChange={(e) => {
                const v = e.target.value;
                setValue("bookCount", v, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Capped height: large copy counts scroll here instead of growing the modal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-36 overflow-y-auto">
        {fields.map((field, idx) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-placeholder">
              Book {idx + 1}
            </label>
            <input
              placeholder="Book Accession Number "
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5"
              {...register(`copies.${idx}.unique_identifier` as const)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
