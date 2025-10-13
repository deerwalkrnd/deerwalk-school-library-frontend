export interface BookModal {
  title: string;
  author: string;
  bookmarkStatus: boolean;
}

export type BookCategory = "ACADEMIC" | "REFERENCE" | "NON_ACADEMIC";
export interface BookRequest {
  id?: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: BookCategory;
  genre?: any[];
  grade: string;
  cover_image_url: string;
  copies?: any[];
}

export interface BookPayload {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: BookCategory;
  genres: number[];
  grade: string;
  cover_image_url: string;
  copies: any[];
}

export interface IBooksColumns {
  id: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: BookCategory;
  grade: string; // e.g., "4"
  cover_image_url: string;
  // Only shown when category = "NON-ACADEMIC"
  genre?: string | null;
  copies?: any[];
}
