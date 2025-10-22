import { RepositoryError } from "@/core/lib/RepositoryError";
import {
  FeedbackResponse,
  PaginatedResponse,
} from "../../domain/entities/FeedbackResponse";
import IFeedbackRepository from "../../domain/repositories/IFeedbackRepository";
import {
  FeedbackQueryParams,
  FeedbackRequest,
} from "../../domain/entities/FeedbackRequest";
import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { IFeedbackColumns } from "../../domain/entities/IFeedbackColumns";
import { Paginated } from "@/core/lib/Pagination";

export class FeedbackRepository implements IFeedbackRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GET_FEEDBACKS: "/api/feedbacks",
    SEND_FEEDBACK: "/api/feedbacks",
    UPDATE_FEEDBACK: (id: number) => `/api/feedbacks/${id}`,
  };

  async getFeedbacks(
    params?: FeedbackQueryParams,
  ): Promise<Paginated<IFeedbackColumns>> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page !== undefined)
        queryParams.append("page", String(params.page));
      if (params?.limit !== undefined)
        queryParams.append("limit", String(params.limit));
      if (params?.is_ack !== undefined)
        queryParams.append("is_ack", String(params.is_ack));

      if (params?.searchable_value?.trim()) {
        queryParams.append("searchable_value", params.searchable_value.trim());
        if (params?.searchable_field) {
          queryParams.append("searchable_field", params.searchable_field);
        }
      }
      if (params?.start_date)
        queryParams.append("start_date", params.start_date);
      if (params?.end_date) queryParams.append("end_date", params.end_date);

      const qs = queryParams.toString();
      const url = `${this.API_URL.GET_FEEDBACKS}${qs ? `/?${qs}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch feedbacks", response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async sendFeedback(payload: FeedbackRequest): Promise<FeedbackResponse> {
    try {
      const response = await fetch(this.API_URL.SEND_FEEDBACK, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.feedback),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to send feedback",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async updateFeedback(payload: FeedbackRequest): Promise<FeedbackResponse> {
    try {
      const response = await fetch(this.API_URL.UPDATE_FEEDBACK(payload.id!), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.feedback),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg ||
            `Failed to update feedback with id ${payload.id}`,
          response.status,
        );
      }
      return await response.json();
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }
}
