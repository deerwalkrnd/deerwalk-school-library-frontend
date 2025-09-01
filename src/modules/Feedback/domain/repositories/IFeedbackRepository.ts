import { FeedbackRequest } from "../entities/FeedbackRequest";
import { FeedbackResponse } from "../entities/FeedbackResponse";

export default interface IFeedbackRepository {
  getFeedbacks(): Promise<FeedbackResponse[]>;
  sendFeedback(payload: FeedbackRequest): Promise<FeedbackResponse>;
  getFeedback(id: number): Promise<any>; //todo: finalize response type
}
