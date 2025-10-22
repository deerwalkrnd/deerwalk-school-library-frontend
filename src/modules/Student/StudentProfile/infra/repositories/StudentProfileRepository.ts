import { RepositoryError } from "@/core/lib/RepositoryError";
import type { StudentProfileData } from "../../domain/entities/studentProfileEntity";
import type { IStudentProfileRepository } from "../../domain/repositories/IStudentProfileRepository";
import { getCookie } from "@/core/presentation/contexts/AuthContext";

interface ApiUserResponse {
  uuid: string;
  name: string;
  roll_number: string;
  email: string;
  role: string;
  graduating_year: string;
  image_url: string;
  user_metadata: {
    additionalProp?: any;
  };
  created_at: string;
  updated_at: string;
}

export class StudentProfileRepository implements IStudentProfileRepository {
  token = getCookie("authToken");

  private readonly API_URL = "/api/me";

  async getStudentProfile(): Promise<StudentProfileData> {
    try {
      const response = await fetch(this.API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch student profile",
          response.status,
        );
      }

      const data: ApiUserResponse = await response.json();

      // Transform API response to StudentProfileData
      return this.transformToStudentProfile(data);
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw error;
      }
      throw new RepositoryError("Network Error");
    }
  }

  private transformToStudentProfile(
    apiData: ApiUserResponse,
  ): StudentProfileData {
    // Extract initials for avatar fallback
    const nameParts = apiData.name.split(" ");
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        : "";

    return {
      name: apiData.name,
      email: apiData.email,
      avatarUrl: apiData.image_url || "",
      avatarFallBack: `${firstInitial}${lastInitial}`,
      totalBooksBorrowed: 0, // These will come from additional API calls or metadata
      totalReturnedBooks: 0,
      fineLevied: 0,
      currentlyReading: [],
      borrowedHistory: [],
      myBookmarks: [],
    };
  }
}
