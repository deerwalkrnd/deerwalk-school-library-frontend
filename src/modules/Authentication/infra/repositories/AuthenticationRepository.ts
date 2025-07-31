import { RepositoryError } from "@/core/lib/RepositoryError";
import { loginResponse } from "../../domain/entities/loginResponse";
import IAuthenticationRepository from "../../domain/repositories/IAuthenticationRepository";
import { User } from "../../domain/entities/userEntity";

export class AuthenticationRepository implements IAuthenticationRepository {
  private readonly API_URL = "/api/student-login";

  async login(): Promise<loginResponse> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new RepositoryError("Failed to fetch", response.status);
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
      const response = await fetch(this.API_URL);
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
