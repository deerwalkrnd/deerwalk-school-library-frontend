import { QueryParams } from "@/core/lib/QueryParams";
import { FilterParams } from "@/modules/Librarian/BookStatus/domain/entities/filter";

export interface FeedbackRequest {
  id?: number;
  feedback: {
    subject?: string;
    feedback?: string;
    is_acknowledged?: boolean;
  };
}

export interface FeedbackQueryParams extends QueryParams {
  is_ack?: boolean;
}
