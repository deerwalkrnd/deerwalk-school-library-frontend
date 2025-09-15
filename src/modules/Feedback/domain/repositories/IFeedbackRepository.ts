import {
  FeedbackQueryParams,
  FeedbackRequest,
} from "../entities/FeedbackRequest";
import { FeedbackResponse } from "../entities/FeedbackResponse";
import { IFeedbackColumns } from "../entities/IFeedbackColumns";

export default interface IFeedbackRepository {
  getFeedbacks(param?: FeedbackQueryParams): Promise<IFeedbackColumns[]>;
  sendFeedback(payload: FeedbackRequest): Promise<FeedbackResponse>;
  updateFeedback(payload: FeedbackRequest): Promise<FeedbackResponse>;
}
