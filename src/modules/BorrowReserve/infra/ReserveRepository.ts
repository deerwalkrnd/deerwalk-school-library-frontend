import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { QueryParams } from "@/core/lib/QueryParams";

export class ReserveRepository implements IReserveRepository {
  token = getCookie("authToken");
  private readonly API_URL = {
    RESERVE_BOOK: (id: number) => `/api/reserves/${id}`,
    GET_RESERVES: `/api/reserves`,
    DELETE_RESERVATION: (id: number) => `/api/reserves/${id}`,
    GET_RESERVATION_STATUS: (id: number) => `/api/reserves/status/${id}`,
    BORROW_RESERVED_BOOK: (id: number) => `/api/reserves/borrow?id=${id}`,
  };

  async deleteReserve(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL.DELETE_RESERVATION(id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to delete reservation",
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

  async getReservationStatus(id: number): Promise<any> {
    try {
      const response = await fetch(
        `${this.API_URL.GET_RESERVATION_STATUS(id)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError("Failed to fetch reserved status");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async getReserves(params?: QueryParams): Promise<any> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page !== undefined)
        queryParams.append("page", String(params.page));
      if (params?.limit !== undefined)
        queryParams.append("limit", String(params.limit));

      if (params?.searchable_value?.trim()) {
        queryParams.append("searchable_value", params.searchable_value.trim());
        if (params?.searchable_field) {
          console.log(params?.searchable_field);
          queryParams.append("searchable_field", params.searchable_field);
        }
      }
      if (params?.start_date)
        queryParams.append("start_date", params.start_date);

      const url = `${this.API_URL.GET_RESERVES}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError("Failed to get reserves");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError("Network Error");
    }
  }

  async reserveBook(book_copy_id: number): Promise<any> {
    try {
      const response = await fetch(
        `${this.API_URL.RESERVE_BOOK(book_copy_id)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to add reserve book",
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

  async borrowReservedBook(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL.BORROW_RESERVED_BOOK(id)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(`Failed to mark reserve`, response.status);
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
