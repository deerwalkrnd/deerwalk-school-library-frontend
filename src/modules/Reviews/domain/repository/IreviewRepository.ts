import { Paginated } from "@/core/lib/Pagination";
import {
  CreateReviewResponse,
  ReviewPayload,
  SpamPayload,
} from "../entities/ReviewEntity";

export default interface IReviewRepository {
  getReviewCount(book_id: number): Promise<number>;
  getReviewsByBookId(
    book_id: number,
    opts?: { page?: number; limit?: number; isSpam?: boolean },
  ): Promise<Paginated<CreateReviewResponse>>;
  markSpam(id: number, payload: SpamPayload): Promise<void>;
  createReview(payload: ReviewPayload): Promise<CreateReviewResponse>;
}
