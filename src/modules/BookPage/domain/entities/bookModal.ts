export interface BookModal {
  title: string;
  author: string;
  bookmarkStatus: boolean;
}

export interface BookRequest {
  id: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: "ACADEMIC" | "FICTION" | "NON_FICTION" | "REFERENCE" | "OTHER";
  grade: string;
  cover_image_url: string;
}
