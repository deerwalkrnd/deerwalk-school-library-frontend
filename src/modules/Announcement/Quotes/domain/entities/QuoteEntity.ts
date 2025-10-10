export interface QuoteRequest {
  uuid?: string;
  quote: string;
  name: string;
  user_metadata?: {
    [key: string]: string;
  };
}
export interface QuoteResponse {
  uuid: string;
  quote: string;
  name: string;
  user_metadata?: {
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
}
