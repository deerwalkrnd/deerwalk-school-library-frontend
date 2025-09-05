import { FeedbackRequest } from "../entities/FeedbackRequest";
import { FeedbackResponse } from "../entities/FeedbackResponse";
import { IFeedbackColumns } from "../entities/IFeedbackColumns";

export default interface IFeedbackRepository {
  getFeedbacks(): Promise<IFeedbackColumns[]>;
  sendFeedback(payload: FeedbackRequest): Promise<FeedbackResponse>;
  updateFeedback(payload: FeedbackRequest): Promise<FeedbackResponse>;
}
