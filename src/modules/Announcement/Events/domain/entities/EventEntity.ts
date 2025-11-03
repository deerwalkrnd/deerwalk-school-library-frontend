export interface EventRequest {
  uuid?: string;
  name: string;
  event_date: string;
  image_url: string;
  description: string;
  venue: string;
}

export interface EventResponse {
  id: string;
  name: string;
  event_date: string;
  image_url: string;
  description: string;
  venue?: string;
}
