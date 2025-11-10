export interface RecommendationResponse {
  id: number;
  name: string;
  designation: string;
  note: string;
  book_title: string;
  cover_image_url?: string;
}
export interface RecommendationRequest {
  id?: number;
  name: string;
  designation: string;
  note: string;
  book_title: string;
  cover_image_url?: string;
}
