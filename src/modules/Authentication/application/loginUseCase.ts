import { RepositoryError } from "@/core/lib/RepositoryError";
import { loginResponse } from "../domain/entities/loginResponse";
import IAuthenticationRepository from "../domain/repositories/IAuthenticationRepository";
import { AuthenticationRepository } from "./../infra/repositories/AuthenticationRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
export class GetLoginUseCase {
  constructor(private AuthenticationRepository: IAuthenticationRepository) {}

  async execute(): Promise<loginResponse> {
    try {
      return await this.AuthenticationRepository.login();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Data access failed");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useLogin = (repository?: IAuthenticationRepository) => {
  const loginRepository = repository || new AuthenticationRepository();
  const useCase = new GetLoginUseCase(loginRepository);

  return useQuery({
    queryKey: [QueryKeys.LOGIN],
    queryFn: () => useCase.execute(),
    retry: 2,
  });
};
