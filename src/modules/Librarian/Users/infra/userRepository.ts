import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IUserRepository from "../domain/repository/IuserRepository";
import { UserRequest, UserResponse } from "../domain/entities/UserEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";

export class UserRepository implements IUserRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    USERS: "/api/users",
    UPDATE_USERS: (id: string | undefined) => `/api/users/${id}`,
    DELETE_USERS: (id: string | undefined) => `/api/users/${id}`,
  };

  async getUsers(params?: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<UserResponse>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }

      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      const url = `${this.API_URL.USERS}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;

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
  async getUserById(id: string): Promise<UserResponse> {
    try {
      const response = await fetch(`${this.API_URL.USERS}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to get user", response.status);
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

  async addUsers(payload: UserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(this.API_URL.USERS, {
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
          error?.detail?.msg || "Failed to add user",
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
  async updateUser(payload: UserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(this.API_URL.UPDATE_USERS(payload.uuid), {
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
          error?.detail?.msg || "Failed to update user",
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

  async deleteUser(id: string): Promise<string> {
    try {
      const response = await fetch(this.API_URL.DELETE_USERS(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          error?.detail?.msg || "Failed to delete user",
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
  // async bulkUploadUsers(): Promise<any> {}
}
