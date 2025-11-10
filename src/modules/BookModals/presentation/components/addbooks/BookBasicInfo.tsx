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

export function BookBasicInfo({ register, errors }: BookBasicInfoProps) {
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
            className={`w-93 px-3 py-2 border rounded-sm bg-primary/5 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title?.message && (
            <p className="text-xs text-red-500">
              {String(errors.title.message)}
            </p>
          )}
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
            className={`w-93 px-3 py-2 border rounded-sm bg-primary/5 text-placeholder ${errors.author ? "border-red-500" : "border-gray-300"}`}
            {...register("author", { required: "Author is required" })}
          />
          {errors.author?.message && (
            <p className="text-xs text-red-500">
              {String(errors.author.message)}
            </p>
          )}
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
            className={`w-93 px-3 py-2 border rounded-sm bg-primary/5 text-placeholder ${errors.publication ? "border-red-500" : "border-gray-300"}`}
            {...register("publication", {
              required: "Publication is required",
            })}
          />
          {errors.publication?.message && (
            <p className="text-xs text-red-500">
              {String(errors.publication.message)}
            </p>
          )}
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
            className={`w-93 px-3 py-2 border rounded-sm bg-primary/5 text-placeholder ${errors.isbn ? "border-red-500" : "border-gray-300"}`}
            {...register("isbn", { required: "ISBN is required" })}
          />
          {errors.isbn?.message && (
            <p className="text-xs text-red-500">
              {String(errors.isbn.message)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
