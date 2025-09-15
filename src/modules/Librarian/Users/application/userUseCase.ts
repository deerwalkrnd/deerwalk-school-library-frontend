import { RepositoryError } from "@/core/lib/RepositoryError";
import { UserResponse } from "../domain/entities/UserEntity";
import IUserRepository from "../domain/repository/IuserRepository";
import { UserRepository } from "./../infra/userRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetUsersUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(params?: any): Promise<UserResponse[]> {
    try {
      return await this.UserRepository.getUsers(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useUsers = (params?: any) => {
  //todo : fix
  const usersRepository = new UserRepository();

  const useCase = new GetUsersUseCase(usersRepository);
  return useQuery({
    queryKey: [QueryKeys.USERS, params],
    queryFn: () => useCase.execute(params),
    retry: 3,
  });
};
