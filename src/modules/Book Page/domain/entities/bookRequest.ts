export interface BookRequest {
  id?: number;
  book: {
    title?: string;
    author?: string;
    publication?: string;
    isbn?: string;
    category?: "ACADEMIC" | "NON-ACADEMIC" | "REFERENCE";
    genres?: number[];
    grade?: string;
    cover_image_url?: string;
    copies?: any[];
  };
}

export interface BookQueryParams {
  page?: number;
  limit?: number;
  genre?: string;
  author?: string;
  category?: string;
  grade?: string;
}
