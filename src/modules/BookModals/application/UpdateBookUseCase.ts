import { UseCaseError } from "@/core/lib/UseCaseError";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { UpdateBookRequest } from "../domain/entities/UpdateBookEntity";
import { BookCategory } from "../domain/entities/BookEntity";

export interface UpdateBookFormData {
  bookType: "academic" | "non_academic" | "reference";
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  copies: { unique_identifier: string }[];
  coverImageFile?: File;
  selectedGenres?: number[];
}

export class UpdateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string, formData: UpdateBookFormData): Promise<any> {
    try {
      const category = BookCategory.fromBookType(formData.bookType);

      if (
        category.requiresGrade() &&
        (!formData.class || formData.class.trim() === "")
      ) {
        throw new UseCaseError(
          "Grade is required for academic and reference books",
        );
      }

      if (
        category.requiresGenres() &&
        (!formData.selectedGenres || formData.selectedGenres.length === 0)
      ) {
        throw new UseCaseError(
          "At least one genre must be selected for non-academic books",
        );
      }

      if (!formData.copies || formData.copies.length === 0) {
        throw new UseCaseError("At least one book copy is required");
      }

      let coverImageUrl = "";
      if (formData.coverImageFile) {
        coverImageUrl = await this.bookRepository.uploadBookCover(
          formData.coverImageFile,
        );
      }

      // Prepare genres based on category
      const genres = category.requiresGenres()
        ? formData.selectedGenres && formData.selectedGenres.length > 0
          ? formData.selectedGenres
          : [0] // fallback to [0] if no genres selected
        : [0]; // academic and reference books use [0]

      const grade = category.requiresGrade() ? formData.class! : "";

      const request = UpdateBookRequest.create(
        id,
        formData.bookType,
        formData.title,
        formData.author,
        formData.publication,
        formData.isbn,
        grade,
        genres,
        formData.copies,
        coverImageUrl,
      );

      return await this.bookRepository.updateBook(request);
    } catch (error: any) {
      if (error instanceof UseCaseError) {
        throw error;
      }
      if (
        error.message.includes("required") ||
        error.message.includes("invalid")
      ) {
        throw new UseCaseError(error.message);
      }
      console.error("Update book use case error:", error);
      throw new UseCaseError("Failed to update book");
    }
  }
}
