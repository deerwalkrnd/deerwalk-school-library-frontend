import { UserRequest } from "./../domain/entities/userEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { loginResponse } from "../domain/entities/loginResponse";
import IAuthenticationRepository from "../domain/repositories/IAuthenticationRepository";
import { AuthenticationRepository } from "./../infra/repositories/AuthenticationRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
export class GetLoginUseCase {
  constructor(private AuthenticationRepository: IAuthenticationRepository) {}

  async execute(credentials: UserRequest): Promise<loginResponse> {
    try {
      return await this.AuthenticationRepository.login(credentials);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError(`${error.message}`);
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useLogin = (
  options?: Omit<
    UseMutationOptions<loginResponse, Error, UserRequest>,
    "mutationFn" | "mutationKey"
  >,
  repository?: IAuthenticationRepository,
) => {
  const loginRepository = repository || new AuthenticationRepository();

  return useMutation({
    mutationFn: (credentials: UserRequest) => {
      const useCase = new GetLoginUseCase(loginRepository);
      return useCase.execute(credentials);
    },
    mutationKey: [QueryKeys.LOGIN],
    ...options,
  });
};
