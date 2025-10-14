export interface QuoteRequest {
  id?: string;
  author: string;
  quote: string;
}
export interface QuoteResponse {
  id: string;
  author: string;
  quote: string;
  created_at: string;
}
export interface Quotes {
  id: string;
  author: string;
  quote: string;
  created_at: string;
}
