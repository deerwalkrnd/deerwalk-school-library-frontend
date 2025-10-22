import { UseCaseError } from "@/core/lib/UseCaseError";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import {
  CreateBookRequest,
  CreateBookResponse,
  BookCategory,
  BookGrade,
  BookCopies,
} from "../domain/entities/BookEntity";

export interface CreateBookFormData {
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

export class CreateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(formData: CreateBookFormData): Promise<CreateBookResponse> {
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

      const genres = category.requiresGenres()
        ? formData.selectedGenres && formData.selectedGenres.length > 0
          ? formData.selectedGenres
          : [0]
        : [0];

      const grade = category.requiresGrade() ? formData.class! : "";

      const request = CreateBookRequest.create(
        formData.bookType,
        formData.title,
        formData.author,
        formData.publication,
        formData.isbn,
        grade,
        genres,
        coverImageUrl,
        formData.copies,
      );

      return await this.bookRepository.createBook(request);
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
      throw new UseCaseError("Failed to create book");
    }
  }
}
