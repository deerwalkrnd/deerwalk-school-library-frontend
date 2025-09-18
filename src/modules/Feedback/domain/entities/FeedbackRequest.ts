import { FilterParams } from "@/modules/Librarian/BookStatus/domain/entities/filter";

export interface FeedbackRequest {
  id?: number;
  feedback: {
    subject?: string;
    feedback?: string;
    is_acknowledged?: boolean;
  };
}

export type SearchableField = "name" | "email" | "subject";
export interface FeedbackQueryParams {
  page?: number;
  limit?: number;
  is_ack?: boolean;
  searchable_value?: string;
  searchable_field?: SearchableField;
  start_date?: string;
  end_date?: string;
}
