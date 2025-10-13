import { ErrorCode, ErrorMessages } from "./../../../../core/lib/ErrorCodes";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { loginResponse } from "../../domain/entities/loginResponse";
import IAuthenticationRepository from "../../domain/repositories/IAuthenticationRepository";
import { User, UserRequest } from "../../domain/entities/userEntity";

export class AuthenticationRepository implements IAuthenticationRepository {
  private readonly API_URL = {
    LOGIN: "/api/login",
    FETCH_USER: "api/me",
  };

  async login(credentials: UserRequest): Promise<loginResponse> {
    try {
      const response = await fetch(this.API_URL.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(` ${error?.detail.msg}`);
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

  async getUser(): Promise<User> {
    try {
      const response = await fetch(this.API_URL.FETCH_USER);
      if (!response.ok) {
        throw new RepositoryError("Failed to fetch user data", response.status);
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
