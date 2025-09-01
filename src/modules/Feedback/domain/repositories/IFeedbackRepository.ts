import { FeedbackRequest } from "../entities/FeedbackRequest";
import { FeedbackResponse } from "../entities/FeedbackResponse";

export default interface IFeedbackRepository {
  getFeedbacks(): Promise<FeedbackResponse[]>;
  sendFeedback(payload: FeedbackRequest): Promise<FeedbackResponse>;
  updateFeedback(
    id: number,
    payload: FeedbackRequest,
  ): Promise<FeedbackResponse>;
}
