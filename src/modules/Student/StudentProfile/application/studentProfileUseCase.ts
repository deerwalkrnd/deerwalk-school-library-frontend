import { useQuery } from "@tanstack/react-query";
import { StudentProfileRepository } from "../infra/repositories/StudentProfileRepository";
import type { IStudentProfileRepository } from "../domain/repositories/IStudentProfileRepository";
import type { StudentProfileData } from "../domain/entities/studentProfileEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetStudentProfileUseCase {
  constructor(private studentProfileRepository: IStudentProfileRepository) {}

  async execute(): Promise<StudentProfileData> {
    try {
      return await this.studentProfileRepository.getStudentProfile();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch student profile");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useStudentProfile = (repository?: IStudentProfileRepository) => {
  const studentProfileRepository = repository || new StudentProfileRepository();
  const useCase = new GetStudentProfileUseCase(studentProfileRepository);

  return useQuery({
    queryKey: [QueryKeys.STUDENTPROFILE],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
