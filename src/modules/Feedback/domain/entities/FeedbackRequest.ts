export interface FeedbackRequest {
  id?: number;
  feedback: {
    subject?: string;
    feedback?: string;
    is_acknowledged?: boolean;
  };
}

export interface FeedbackQueryParams {
  page?: number;
  limit?: number;
  is_ack?: boolean;
}
