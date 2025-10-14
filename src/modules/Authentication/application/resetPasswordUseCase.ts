import { RepositoryError } from "@/core/lib/RepositoryError";
import { ResetPasswordResponse } from "../domain/entities/resetPasswordResponse";
import IAuthenticationRepository from "../domain/repositories/IAuthenticationRepository";
import { AuthenticationRepository } from "./../infra/repositories/AuthenticationRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export class ResetPasswordUseCase {
  constructor(private AuthenticationRepository: IAuthenticationRepository) {}

  async execute({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }): Promise<ResetPasswordResponse> {
    try {
      return await this.AuthenticationRepository.resetPasswordConfirm({
        token,
        newPassword,
      });
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError(`${error.message}`);
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useResetPassword = (
  options?: Omit<
    UseMutationOptions<
      ResetPasswordResponse,
      Error,
      { token: string; newPassword: string }
    >,
    "mutationFn" | "mutationKey"
  >,
  repository?: IAuthenticationRepository,
) => {
  const authRepository = repository || new AuthenticationRepository();

  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => {
      const useCase = new ResetPasswordUseCase(authRepository);
      return useCase.execute({ token, newPassword });
    },
    mutationKey: [QueryKeys.LOGIN, "reset-password"],
    ...options,
  });
};
