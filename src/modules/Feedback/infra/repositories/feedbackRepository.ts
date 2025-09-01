import { RepositoryError } from "@/core/lib/RepositoryError";
import { FeedbackResponse } from "../../domain/entities/FeedbackResponse";
import IFeedbackRepository from "../../domain/repositories/IFeedbackRepository";
import { FeedbackRequest } from "../../domain/entities/FeedbackRequest";

export class FeedbackRepository implements IFeedbackRepository {
  private readonly API_URL = {
    GET_FEEDBACKS: "/api/feedbacks",
    SEND_FEEDBACK: "/api/feedbacks",
    UPDATE_FEEDBACK: (id: number) => `/api/feedbacks/${id}`,
  };

  async getFeedbacks(): Promise<FeedbackResponse[]> {
    try {
      const response = await fetch(this.API_URL.GET_FEEDBACKS, {
        method: "GET",
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

  async updateFeedback(
    id: number,
    payload: FeedbackRequest,
  ): Promise<FeedbackResponse> {
    try {
      const response = await fetch(this.API_URL.UPDATE_FEEDBACK(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || `Failed to update feedback with id ${id}`,
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
