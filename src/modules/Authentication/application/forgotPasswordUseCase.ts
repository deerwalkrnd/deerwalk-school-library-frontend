import { RepositoryError } from "@/core/lib/RepositoryError";
import { ForgotPasswordResponse } from "../domain/entities/forgotPasswordResponse";
import IAuthenticationRepository from "../domain/repositories/IAuthenticationRepository";
import { AuthenticationRepository } from "./../infra/repositories/AuthenticationRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export class ForgotPasswordUseCase {
  constructor(private AuthenticationRepository: IAuthenticationRepository) {}

  async execute({ email }: { email: string }): Promise<ForgotPasswordResponse> {
    try {
      return await this.AuthenticationRepository.resetPassword({ email });
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError(`${error.message}`);
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useForgotPassword = (
  options?: Omit<
    UseMutationOptions<ForgotPasswordResponse, Error, { email: string }>,
    "mutationFn" | "mutationKey"
  >,
  repository?: IAuthenticationRepository,
) => {
  const authRepository = repository || new AuthenticationRepository();

  return useMutation({
    mutationFn: ({ email }: { email: string }) => {
      const useCase = new ForgotPasswordUseCase(authRepository);
      return useCase.execute({ email });
    },
    mutationKey: [QueryKeys.LOGIN, "forgot-password"],
    ...options,
  });
};
