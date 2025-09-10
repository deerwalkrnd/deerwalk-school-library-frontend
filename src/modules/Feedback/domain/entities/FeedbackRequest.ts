export interface FeedbackRequest {
  id?: number;
  feedback: {
    subject?: string;
    body?: string;
    is_acknowledged?: boolean;
  };
}

export interface FeedbackQueryParams {
  page?: number;
  limit?: number;
  is_ack?: boolean;
}
