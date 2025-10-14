import { getCookie } from "@/core/presentation/contexts/AuthContext";
import {
  CreateReviewResponse,
  ReviewPayload,
  SpamPayload,
} from "../domain/entities/ReviewEntity";
import IReviewRepository from "../domain/repository/IreviewRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";

export class ReviewRepository implements IReviewRepository {
  token = getCookie("authToken");
  private readonly API_URL = {
    REVIEW: "/api/reviews",
    UPDATE_REVIEWS: (id: number) => `/api/reviews/${id}`,
    GET_REVIEW_BY_ID: (id: number) => `/api/reviews/${id}`,
    REVIEW_COUNT: (id: number) => `/api/reviews/count?book_id=${id}`,
  };
  async createReview(payload: ReviewPayload): Promise<CreateReviewResponse> {
    try {
      const response = await fetch(this.API_URL.REVIEW, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to add review",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }

  async getReviewCount(book_id: number): Promise<number> {
    try {
      const response = await fetch(this.API_URL.REVIEW_COUNT(book_id), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to get review count",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }

  async getReviewsByBookId(
    book_id: number,
    opts?: { page?: number; limit?: number; isSpam?: boolean },
  ): Promise<Paginated<CreateReviewResponse>> {
    try {
      const url = new URL(
        this.API_URL.GET_REVIEW_BY_ID(book_id),
        window.location.origin,
      );

      if (opts?.page) url.searchParams.append("page", opts.page.toString());
      if (opts?.limit) url.searchParams.append("limit", opts.limit.toString());
      if (opts?.isSpam !== undefined)
        url.searchParams.append("is_spam", opts.isSpam.toString());

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to fetch review",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }

  async markSpam(id: number, payload: SpamPayload): Promise<void> {
    try {
      const response = await fetch(this.API_URL.GET_REVIEW_BY_ID(id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to mark review as spam",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network error");
    }
  }
}
