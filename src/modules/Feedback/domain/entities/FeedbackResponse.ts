export interface FeedbackResponse {
  id: number;
  subject: string;
  feedback: string;
  user_id: string;
  is_acknowledged: boolean;
}
