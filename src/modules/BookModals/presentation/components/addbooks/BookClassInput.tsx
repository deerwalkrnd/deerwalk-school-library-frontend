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
        placeholder="1, 2, ... 10"
        className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm bg-primary/5"
        {...register("class")}
      />
    </div>
  );
}
