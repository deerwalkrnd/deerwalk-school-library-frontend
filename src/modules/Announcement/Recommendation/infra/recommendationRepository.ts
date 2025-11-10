import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IRecommendationRepository from "../domain/repository/IrecommendationRepository";
import {
  RecommendationRequest,
  RecommendationResponse,
} from "../domain/entities/RecommendationEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";
import { QueryParams } from "@/core/lib/QueryParams";

export class RecommendationRepository implements IRecommendationRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    RECOMMENDATIONS: "/api/recommendations",
    UPDATE_RECOMMENDATIONS: (id: number) => `/api/recommendations/${id}`,
    DELETE_RECOMMENDATIONS: (id: number) => `/api/recommendations/${id}`,
  };

  async getRecommendations(
    params?: QueryParams,
  ): Promise<Paginated<RecommendationResponse>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }

      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params?.searchable_value?.trim()) {
        queryParams.append("searchable_value", params.searchable_value.trim());
        if (params?.searchable_field) {
          console.log(params?.searchable_field);
          queryParams.append("searchable_field", params.searchable_field);
        }
      }

      const url = `${this.API_URL.RECOMMENDATIONS}${
        queryParams.toString() ? `/?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch recommendations",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }

  async addRecommendation(
    payload: RecommendationRequest,
  ): Promise<RecommendationResponse> {
    try {
      const response = await fetch(this.API_URL.RECOMMENDATIONS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to add recommendation",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }

  async updateRecommendation(
    payload: RecommendationRequest,
  ): Promise<RecommendationResponse> {
    try {
      const response = await fetch(
        this.API_URL.UPDATE_RECOMMENDATIONS(payload.id!),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to update recommendation",
          response.status,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }

  async deleteRecommendation(id: number): Promise<string> {
    try {
      const response = await fetch(this.API_URL.DELETE_RECOMMENDATIONS(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to delete recommendation",
          response.status,
        );
      }

      return "Recommendation deleted successfully";
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
}
