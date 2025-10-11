export interface BookModal {
  title: string;
  author: string;
  bookmarkStatus: boolean;
}

export interface BookRequest {
  id?: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: "ACADEMIC" | "NON_ACADEMIC" | "REFERENCE";
  grade: string;
  cover_image_url: string;
}

export interface BookPayload {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: "ACADEMIC" | "NON_ACADEMIC" | "REFERENCE";
  genres: number[];
  grade: string;
  cover_image_url: string;
  copies: any[];
}

export interface IBooksColumns {
  id?: string; // Unique identifier (optional if auto-generated)
  title: string; // Book title
  author: string; // Author name
  bookNumber: number; // Unique catalog / library number
  publication: string; // Publisher name
  isbn?: string; // Optional ISBN number
  price?: number; // Optional price
  type: string; // e.g., "Textbook", "Novel", "Reference"
  genre?: string; // e.g., "Fiction", "Science", etc.
  class?: string; // For school-level categorization
  available: boolean; // Availability status (true/false)
  dateAdded: string | Date; // When the book was added
}
