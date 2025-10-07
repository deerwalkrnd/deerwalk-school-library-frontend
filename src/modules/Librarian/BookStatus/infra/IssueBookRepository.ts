import { getDefaultClassNames } from "react-day-picker";
import IissueRepository from "../domain/repositories/IIssueBookRepository";
import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { Paginated } from "@/core/lib/Pagination";
import { RepositoryError } from "@/core/lib/RepositoryError";

export class IssueBookRepository implements IissueRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GET_ISSUES: "/api/issues",
    ISSUE_BOOK: (id: string | undefined) => `/api/issues/`,
    UPDATE_ISSUE: (id: string | undefined) => `/api/issues/${id}`,
    DELETE_ISSUE: (id: string | undefined) => `/api/issues/${id}`,
  };

  async getIssues(params: any): Promise<Paginated<any>> {
    try {
      // const url = `${this.API_URL.ISSUE_BOOK}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;
      const url = `${this.API_URL.GET_ISSUES}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError("Failed to fetch users", response.status);
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

  async deleteIssue(id: any): Promise<any> {
    try {
      const response = await fetch(this.API_URL.DELETE_ISSUE(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to delete issue",
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

  async issueBook(payload: any): Promise<any> {
    try {
      const response = await fetch(this.API_URL.UPDATE_ISSUE(payload), {
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
          error?.detail?.msg || "Failed to update issue",
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
