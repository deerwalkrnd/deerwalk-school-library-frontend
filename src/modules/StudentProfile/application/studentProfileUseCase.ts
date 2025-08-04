import { useQuery } from "@tanstack/react-query";
import { StudentProfileRepository } from "../infra/repositories/StudentProfileRepository";
import { IStudentProfileRepository } from "../domain/repositories/IStudentProfileRepository";
import { StudentProfileData } from "../domain/entities/studentProfileEntity";

export class GetStudentProfileUseCase {
  constructor(private studentProfileRepository: IStudentProfileRepository) {}

  async execute(): Promise<StudentProfileData> {
    try {
      return await this.studentProfileRepository.getStudentProfile();
    } catch (error: any) {
      throw new Error(`Failed to fetch Student Profile: ${error.message}`);
    }
  }
}

export const useStudentProfile = (repository?: IStudentProfileRepository) => {
  const studentProfileRepository = repository || new StudentProfileRepository();
  const useCase = new GetStudentProfileUseCase(studentProfileRepository);

  return useQuery({
    queryKey: ["student-profile"],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
