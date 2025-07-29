import { StudentProfileData } from "../../domain/entities/studentProfileEntity";
import { IStudentProfileRepository } from "../../domain/repositories/IStudentProfileRepository";

export class StudentProfileRepository implements IStudentProfileRepository {
  private readonly API_URL = "/api/student-profile";

  async getStudentProfile(): Promise<StudentProfileData> {
    const response = await fetch(this.API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch student profile");
    }
    return response.json();
  }
}
