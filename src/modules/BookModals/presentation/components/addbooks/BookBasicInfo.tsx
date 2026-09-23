import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: { unique_identifier: string }[];
}

interface BookBasicInfoProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

const FIELDS = [
  {
    name: "title",
    label: "Title",
    placeholder: "e.g. The Famous Five",
    required: "Title is required",
  },
  {
    name: "author",
    label: "Author",
    placeholder: "e.g. Enid Blyton",
    required: "Author is required",
  },
  {
    // Stored as `publication`, but it holds the publisher's name.
    name: "publication",
    label: "Publisher",
    placeholder: "e.g. Oxford University Press",
    required: "Publisher is required",
  },
  {
    name: "isbn",
    label: "ISBN",
    placeholder: "e.g. 978-0-19-431734-0",
    required: "ISBN is required",
  },
] as const;

export function BookBasicInfo({ register, errors }: BookBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
      {FIELDS.map(({ name, label, placeholder, required }) => {
        const error = errors[name]?.message;
        return (
          <div key={name} className="space-y-2">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-black"
            >
              {label}
            </label>
            <input
              id={name}
              placeholder={placeholder}
              className={`w-full h-12 px-3 border rounded-lg bg-primary/5 text-sm ${error ? "border-red-500" : "border-gray-300"}`}
              {...register(name, { required })}
            />
            {error && <p className="text-xs text-red-500">{String(error)}</p>}
          </div>
        );
      })}
    </div>
  );
}
