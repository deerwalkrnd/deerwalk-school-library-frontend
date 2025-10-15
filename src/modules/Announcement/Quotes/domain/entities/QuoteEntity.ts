export interface QuoteRequest {
  id?: number;
  author: string;
  quote: string;
}
export interface QuoteResponse {
  id: number;
  author: string;
  quote: string;
  created_at: string;
}
export interface Quotes {
  id: number;
  author: string;
  quote: string;
  created_at: string;
}
