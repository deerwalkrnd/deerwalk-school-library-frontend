export interface BookResponse {
  id: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: "ACADEMIC" | "NON-ACADEMIC" | "REFERENCE";
  grade: string;
  cover_image_url: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
