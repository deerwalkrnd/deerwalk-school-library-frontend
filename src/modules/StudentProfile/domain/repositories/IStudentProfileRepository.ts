import { StudentProfileData } from "../entities/studentProfileEntity";

export interface IStudentProfileRepository {
  getStudentProfile(): Promise<StudentProfileData>;
}
