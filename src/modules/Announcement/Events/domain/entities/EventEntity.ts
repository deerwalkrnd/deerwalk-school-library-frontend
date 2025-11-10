export interface EventRequest {
  id?: number;
  name: string;
  event_date: string;
  image_url: string;
  description: string;
  venue: string;
}

export interface EventResponse {
  id: number;
  name: string;
  event_date: string;
  image_url: string;
  description: string;
  venue?: string;
}
