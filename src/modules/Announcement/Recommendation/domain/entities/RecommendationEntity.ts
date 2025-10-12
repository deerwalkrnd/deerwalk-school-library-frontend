export interface RecommendationResponse {
  id: string;
  name: string;
  designation: string;
  note: string;
  book_title: string;
  cover_image_url?: string;
}
export interface RecommendationRequest {
  uuid?: string;
  name: string;
  designation: string;
  note: string;
  book_title: string;
  cover_image_url?: string;
}
