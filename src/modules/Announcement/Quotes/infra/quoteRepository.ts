import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IQuoteRepository from "../domain/repository/IquoteRepository";
import { QuoteRequest, QuoteResponse } from "../domain/entities/QuoteEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";
import { QueryParams } from "@/core/lib/QueryParams";

export class QuoteRepository implements IQuoteRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    QUOTES: "/api/quotes",
    DELETE_QUOTES: (id: number) => `/api/quotes/${id}`,
  };

  private toIso(value?: string) {
    if (!value) return value;
    const candidate = value.includes(" ") ? value.replace(" ", "T") : value;
    const d = new Date(candidate);
    return Number.isNaN(d.getTime()) ? value : d.toISOString();
  }

  async getQuotes(params?: QueryParams): Promise<Paginated<QuoteResponse>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page !== undefined)
        queryParams.append("page", String(params.page));
      if (params?.limit !== undefined)
        queryParams.append("limit", String(params.limit));

      if (params?.searchable_value?.trim()) {
        queryParams.append("searchable_value", params.searchable_value.trim());
        if (params?.searchable_field) {
          queryParams.append("searchable_field", params.searchable_field);
        }
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

      const normalized: Paginated<QuoteResponse> = {
        ...data,
        items: (data.items || []).map((it: any) => ({
          ...it,
          created_at: this.toIso(it.created_at ?? it.createdAt),
        })),
      };

      return normalized;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
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
      return {
        ...data,
        created_at: this.toIso(
          (data as any).created_at ?? (data as any).createdAt,
        ) as string,
      };
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
