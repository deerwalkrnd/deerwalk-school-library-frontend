import { UseFormRegister } from "react-hook-form";

interface FormValues {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: { unique_identifier: string }[];
}

interface BookClassInputProps {
  register: UseFormRegister<FormValues>;
}

export function BookClassInput({ register }: BookClassInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="class" className="block text-sm font-medium text-black">
        Class
      </label>
      <input
        id="class"
        placeholder="1,2,...10"
        className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-placeholder text-sm font-medium bg-primary/5"
        {...register("class")}
      />
    </div>
  );
}
