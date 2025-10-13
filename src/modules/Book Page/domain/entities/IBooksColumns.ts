export interface IBookColumns {
  id?: number;
  title: string;
  author: string;
  publication: string;
  isbn?: string;
  category?: "ACADEMIC" | "NON-ACADEMIC" | "REFERENCE";
  grade?: string;
  cover_image_url?: string;
  created_at: string;
}
