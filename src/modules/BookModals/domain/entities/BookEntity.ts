export class BookTitle {
  private constructor(private readonly value: string) {}

  public static create(title: string): BookTitle {
    if (!title || title.trim().length === 0) {
      throw new Error("Book title is required");
    }
    if (title.trim().length < 2) {
      throw new Error("Book title must be at least 2 characters");
    }
    if (title.length > 200) {
      throw new Error("Book title cannot exceed 200 characters");
    }
    return new BookTitle(title.trim());
  }

  public getValue(): string {
    return this.value;
  }
}

export class BookAuthor {
  private constructor(private readonly value: string) {}

  public static create(author: string): BookAuthor {
    if (!author || author.trim().length === 0) {
      throw new Error("Book author is required");
    }
    if (author.trim().length < 2) {
      throw new Error("Book author must be at least 2 characters");
    }
    if (author.length > 100) {
      throw new Error("Book author cannot exceed 100 characters");
    }
    return new BookAuthor(author.trim());
  }

  public getValue(): string {
    return this.value;
  }
}

export class BookISBN {
  private constructor(private readonly value: string) {}

  public static create(isbn: string): BookISBN {
    if (!isbn || isbn.trim().length === 0) {
      throw new Error("ISBN is required");
    }

    return new BookISBN(isbn.trim());
  }

  public getValue(): string {
    return this.value;
  }
}

export class BookPublication {
  private constructor(private readonly value: string) {}

  public static create(publication: string): BookPublication {
    if (!publication || publication.trim().length === 0) {
      throw new Error("Publication is required");
    }
    if (publication.trim().length < 2) {
      throw new Error("Publication must be at least 2 characters");
    }
    return new BookPublication(publication.trim());
  }

  public getValue(): string {
    return this.value;
  }
}

export class BookCategory {
  private constructor(
    private readonly value: "ACADEMIC" | "NON_ACADEMIC" | "REFERENCE",
  ) {}

  public static fromBookType(
    bookType: "academic" | "non_academic" | "reference",
  ): BookCategory {
    const map = {
      academic: "ACADEMIC" as const,
      non_academic: "NON_ACADEMIC" as const,
      reference: "REFERENCE" as const,
    };
    return new BookCategory(map[bookType]);
  }

  public requiresGrade(): boolean {
    return this.value === "ACADEMIC" || this.value === "REFERENCE";
  }

  public requiresGenres(): boolean {
    return this.value === "NON_ACADEMIC";
  }

  public getValue(): string {
    return this.value;
  }
}

export class BookGrade {
  private constructor(private readonly value: string) {}

  public static create(grade: string): BookGrade {
    if (!grade || grade.trim().length === 0) {
      throw new Error("Grade is required for academic and reference books");
    }
    return new BookGrade(grade.trim());
  }

  public getValue(): string {
    return this.value;
  }
}

export class BookCopy {
  private constructor(private readonly uniqueIdentifier: string) {}

  public static create(uniqueIdentifier: string): BookCopy {
    if (!uniqueIdentifier || uniqueIdentifier.trim().length === 0) {
      throw new Error("Book copy unique identifier is required");
    }
    return new BookCopy(uniqueIdentifier.trim());
  }

  public getUniqueIdentifier(): string {
    return this.uniqueIdentifier;
  }
}

export class BookCopies {
  private constructor(private readonly copies: BookCopy[]) {}

  public static create(copies: { unique_identifier: string }[]): BookCopies {
    if (!copies || copies.length === 0) {
      throw new Error("At least one book copy is required");
    }

    const bookCopies = copies.map((copy) =>
      BookCopy.create(copy.unique_identifier),
    );
    return new BookCopies(bookCopies);
  }

  public getCopies(): BookCopy[] {
    return this.copies;
  }

  public toJSON() {
    return this.copies.map((copy) => ({
      unique_identifier: copy.getUniqueIdentifier(),
    }));
  }
}

export class CreateBookRequest {
  constructor(
    public readonly title: BookTitle,
    public readonly author: BookAuthor,
    public readonly publication: BookPublication,
    public readonly isbn: BookISBN,
    public readonly category: BookCategory,
    public readonly grade: BookGrade | null,
    public readonly genres: number[],
    public readonly coverImageUrl: string,
    public readonly copies: BookCopies,
  ) {}

  public static create(
    bookType: "academic" | "non_academic" | "reference",
    title: string,
    author: string,
    publication: string,
    isbn: string,
    grade: string,
    genres: number[],
    coverImageUrl: string,
    copies: { unique_identifier: string }[],
  ): CreateBookRequest {
    const category = BookCategory.fromBookType(bookType);
    const bookGrade = category.requiresGrade() ? BookGrade.create(grade) : null;

    return new CreateBookRequest(
      BookTitle.create(title),
      BookAuthor.create(author),
      BookPublication.create(publication),
      BookISBN.create(isbn),
      category,
      bookGrade,
      genres,
      coverImageUrl,
      BookCopies.create(copies),
    );
  }

  public toJSON() {
    return {
      title: this.title.getValue(),
      author: this.author.getValue(),
      publication: this.publication.getValue(),
      isbn: this.isbn.getValue(),
      category: this.category.getValue(),
      genres: this.genres,
      grade: this.grade?.getValue() || "",
      cover_image_url: this.coverImageUrl,
      copies: this.copies.toJSON(),
    };
  }
}

export interface CreateBookResponse {
  success: boolean;
  message: string;
  bookId?: string;
}
