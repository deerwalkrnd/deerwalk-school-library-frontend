import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IUserRepository from "../domain/repository/IuserRepository";
import { UserResponse } from "../domain/entities/UserEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";

export class UserRepository implements IUserRepository {
  token = getCookie("authToken");

  private readonly API_URL = {
    GET_USERS: "/api/users",
    UPDATE_USERS: (id: number) => `/api/users/${id}`,
    DELETE_USERS: (id: number) => `/api/users/${id}`,
  };

  async getUsers(params?: any): Promise<UserResponse[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }

      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      const url = `${this.API_URL.GET_USERS}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;

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

  // async deleteUser(id: string): Promise<string> {}
  // async addUsers(): Promise<UserResponse> {}
  // async getUserById(id: string): Promise<UserResponse> {}
  // async bulkUploadUsers(): Promise<any> {}

  // async updateUser(id: string): Promise<UserResponse> {}
}
