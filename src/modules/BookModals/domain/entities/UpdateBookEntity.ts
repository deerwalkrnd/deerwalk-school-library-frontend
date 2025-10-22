import {
  BookTitle,
  BookAuthor,
  BookISBN,
  BookPublication,
  BookCategory,
  BookGrade,
  BookCopies,
} from "./BookEntity";

export class UpdateBookRequest {
  constructor(
    public readonly id: string,
    public readonly title: BookTitle,
    public readonly author: BookAuthor,
    public readonly publication: BookPublication,
    public readonly isbn: BookISBN,
    public readonly category: BookCategory,
    public readonly grade: BookGrade | null,
    public readonly genres: number[],
    public readonly copies: BookCopies,
    public readonly coverImageUrl?: string,
  ) {}

  public static create(
    id: string,
    bookType: "academic" | "non_academic" | "reference",
    title: string,
    author: string,
    publication: string,
    isbn: string,
    grade: string,
    genres: number[],
    copies: { unique_identifier: string }[],
    coverImageUrl?: string,
  ): UpdateBookRequest {
    const category = BookCategory.fromBookType(bookType);
    const bookGrade = category.requiresGrade() ? BookGrade.create(grade) : null;

    return new UpdateBookRequest(
      id,
      BookTitle.create(title),
      BookAuthor.create(author),
      BookPublication.create(publication),
      BookISBN.create(isbn),
      category,
      bookGrade,
      genres,
      BookCopies.create(copies),
      coverImageUrl,
    );
  }

  public toJSON() {
    return {
      id: this.id,
      title: this.title.getValue(),
      author: this.author.getValue(),
      publication: this.publication.getValue(),
      isbn: this.isbn.getValue(),
      category: this.category.getValue(),
      genres: this.genres,
      grade: this.grade?.getValue() || "",
      cover_image_url: this.coverImageUrl || "",
      copies: this.copies.toJSON(),
    };
  }
}

export interface UpdateBookResponse {
  success: boolean;
  message: string;
  bookId?: string;
}

export interface BookGenre {
  id: number;
  title: string;
  selected?: boolean;
}

export interface BookGenresResponse {
  items: BookGenre[];
  page: number;
  total: number;
  hasNextPage: boolean;
}
