import { ErrorCode, ErrorMessages } from "./../../../../core/lib/ErrorCodes";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { loginResponse } from "../../domain/entities/loginResponse";
import { ForgotPasswordResponse } from "../../domain/entities/forgotPasswordResponse";
import { ResetPasswordResponse } from "../../domain/entities/resetPasswordResponse";
import IAuthenticationRepository from "../../domain/repositories/IAuthenticationRepository";
import { User, UserRequest } from "../../domain/entities/userEntity";

export class AuthenticationRepository implements IAuthenticationRepository {
  private readonly API_URL = {
    LOGIN: "/api/login",
    SSO_LOGIN: "/api/login",
    GOOGLE_CALLBACK: "/api/auth/google/callback",
    FETCH_USER: "/api/me",
    FORGOT_PASSWORD: "/api/forgot-password",
    RESET_PASSWORD: "/api/reset-password",
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

  async loginWithSSO(provider: string): Promise<loginResponse> {
    try {
      const response = await fetch(
        `${this.API_URL.SSO_LOGIN}?method=sso&provider=${provider}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          ` ${error?.detail?.msg || error?.message || "SSO login failed"}`,
        );
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

  async handleGoogleCallback(code: string): Promise<loginResponse> {
    try {
      const response = await fetch(
        `${this.API_URL.GOOGLE_CALLBACK}?code=${encodeURIComponent(code)}`,
      );

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          ` ${error?.detail?.msg || error?.message || "Google callback failed"}`,
        );
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

  async resetPassword({
    email,
  }: {
    email: string;
  }): Promise<ForgotPasswordResponse> {
    try {
      const response = await fetch(`${this.API_URL.FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          ` ${error?.detail?.msg || error?.message || "Failed to send reset email"}`,
        );
      }

      const data = await response.json();

      return {
        message: data.message || "Reset email sent successfully",
        success: true,
      };
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  async resetPasswordConfirm({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }): Promise<ResetPasswordResponse> {
    try {
      const response = await fetch(
        `${this.API_URL.RESET_PASSWORD}?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_password: newPassword }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new RepositoryError(
          ` ${error?.detail?.msg || error?.message || "Failed to reset password"}`,
        );
      }

      const data = await response.json();

      return {
        message: data.message || "Password reset successfully",
        success: true,
      };
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }
}
