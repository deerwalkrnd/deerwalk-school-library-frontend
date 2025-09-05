export interface FeedbackRequest {
  id: number;
  feedback: {
    subject?: string;
    body?: string;
    is_acknowledged?: boolean;
  };
}
