import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IQuoteRepository from "../domain/repository/IquoteRepository";
import { QuoteRequest, QuoteResponse } from "../domain/entities/QuoteEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";

export class QuoteRepository implements IQuoteRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    QUOTES: "/api/quotes",
    DELETE_QUOTES: (id: number) => `/api/quotes/${id}`,
  };

  async getQuotes(params?: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<QuoteResponse>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }
      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }
      const url = `${this.API_URL.QUOTES}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to fetch quotes", response.status);
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

  async addQuote(payload: QuoteRequest): Promise<QuoteResponse> {
    try {
      const response = await fetch(this.API_URL.QUOTES, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to add quote", response.status);
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

  async deleteQuote(id: number): Promise<string> {
    try {
      const response = await fetch(this.API_URL.DELETE_QUOTES(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to delete quote", response.status);
      }
      return "Quote deleted successfully";
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }

  async updateQuote(payload: QuoteRequest): Promise<QuoteResponse> {
    try {
      const response = await fetch(this.API_URL.DELETE_QUOTES(payload.id!), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to update quote", response.status);
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
  async addRandomQuote(): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.API_URL.QUOTES}/random`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to add random quote",
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
}
