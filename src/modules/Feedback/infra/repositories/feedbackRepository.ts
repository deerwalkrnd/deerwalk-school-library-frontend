import { RepositoryError } from "@/core/lib/RepositoryError";
import { FeedbackResponse } from "../../domain/entities/FeedbackResponse";
import IFeedbackRepository from "../../domain/repositories/IFeedbackRepository";
import { FeedbackRequest } from "../../domain/entities/FeedbackRequest";

export class FeedbackRepository implements IFeedbackRepository {
  private readonly API_URL = {
    GET_FEEDBACKS: "/api/feedbacks",
    SEND_FEEDBACK: "/api/feedbacks",
    GET_FEEDBACK: (id: number) => `/api/feedbacks/${id}`,
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

  async getFeedback(id: number): Promise<FeedbackResponse> {
    try {
      const response = await fetch(this.API_URL.GET_FEEDBACK(id), {
        method: "GET",
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch feedback", response.status);
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
}
