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

interface BookBasicInfoProps {
  register: UseFormRegister<FormValues>;
}

export function BookBasicInfo({ register }: BookBasicInfoProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black"
          >
            Title
          </label>
          <input
            id="title"
            placeholder="Title"
            className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5"
            {...register("title", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-black"
          >
            Author
          </label>
          <input
            id="author"
            placeholder="Author"
            className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder"
            {...register("author", { required: true })}
          />
        </div>
      </div>

      {/* Publication / ISBN */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="publication"
            className="block text-sm font-medium text-black"
          >
            Publication
          </label>
          <input
            id="publication"
            placeholder="Publication"
            className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder"
            {...register("publication", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-black"
          >
            ISBN
          </label>
          <input
            id="isbn"
            placeholder="ISBN"
            className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder"
            {...register("isbn", { required: true })}
          />
        </div>
      </div>
    </>
  );
}
