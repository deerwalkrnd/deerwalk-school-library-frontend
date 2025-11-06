import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { RepositoryError } from "@/core/lib/RepositoryError";
import type { BorrowsResponse } from "../../domain/entities/studentProfileEntity";
import type { GetCurrentBorrowsParams } from "@/modules/Student/StudentProfile/domain/entities/studentProfileEntity";
import type { IBorrowsRepository } from "../../domain/repositories/IBorrowsRepository";

export class BorrowsRepository implements IBorrowsRepository {
  private readonly API_URL = "/api/borrows/current";

  async getCurrentBorrows(
    params?: GetCurrentBorrowsParams,
  ): Promise<BorrowsResponse> {
    try {
      const token = getCookie("authToken");

      if (!token) {
        throw new RepositoryError("No authentication token found", 401);
      }

      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
      if (params?.is_descending !== undefined)
        queryParams.append("is_descending", params.is_descending.toString());
      if (params?.searchable_value)
        queryParams.append("searchable_value", params.searchable_value);
      if (params?.searchable_field)
        queryParams.append("searchable_field", params.searchable_field);
      if (params?.starts) queryParams.append("starts", params.starts);
      if (params?.ends) queryParams.append("ends", params.ends);

      const url =
        queryParams.toString().length > 0
          ? `${this.API_URL}?${queryParams.toString()}`
          : this.API_URL;

      console.log("[v0] Fetching from endpoint:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("[v0] Response status:", response.status);

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch currently borrowed books",
          response.status,
        );
      }

      const data: BorrowsResponse = await response.json();
      console.log("[v0] Data received:", data);
      return data;
    } catch (error) {
      console.log("[v0] Error occurred:", error);
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }
}
