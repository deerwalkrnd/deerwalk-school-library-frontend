import { RepositoryError } from "@/core/lib/RepositoryError";
import { UserRequest, UserResponse } from "../domain/entities/UserEntity";
import IUserRepository from "../domain/repository/IuserRepository";
import { UserRepository } from "./../infra/userRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { Paginated } from "@/core/lib/Pagination";

export class GetUsersUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(params?: any): Promise<Paginated<UserResponse>> {
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

export class AddUserUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(payload: UserRequest): Promise<UserResponse> {
    try {
      return await this.UserRepository.addUsers(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to add user");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class GetUserByIdUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponse> {
    try {
      return await this.UserRepository.getUserById(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch user");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export class UpdateUserUseCase {
  constructor(private UserRepository: IUserRepository) {}
  async execute(payload: UserRequest): Promise<UserResponse> {
    try {
      return await this.UserRepository.updateUser(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to update user");
      }
      throw new UseCaseError(`Unexpected Error : ${error.message}`);
    }
  }
}

export class DeleteUserUseCase {
  constructor(private UserRepository: IUserRepository) {}
  async execute(id: string): Promise<string> {
    try {
      return await this.UserRepository.deleteUser(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete user");
      }
      throw new UseCaseError(`Unexpected Error : ${error.message}`);
    }
  }
}

export const getUserById = (id: string) => {
  const usersRepository = new UserRepository();
  const useCase = new GetUserByIdUseCase(usersRepository);

  return useQuery({
    queryKey: [QueryKeys.USERS, id],
    queryFn: () => useCase.execute(id),
    retry: 2,
  });
};

export const useAddUser = () => {
  const usersRepository = new UserRepository();
  const useCase = new AddUserUseCase(usersRepository);
  const queryClient = useQueryClient();
  //todo: fix keys
  return useMutation({
    mutationFn: (payload: UserRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
    },
  });
};

export const getUsers = (params?: { page?: number; limit?: number }) => {
  //todo : fix
  const usersRepository = new UserRepository();

  const useCase = new GetUsersUseCase(usersRepository);
  return useQuery({
    queryKey: [QueryKeys.USERS, params?.page, params?.limit],
    queryFn: () => useCase.execute(params),
    retry: 3,
  });
};

export const updateUser = () => {
  const userRepository = new UserRepository();

  const useCase = new UpdateUserUseCase(userRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UserRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
    },
  });
};

export const deleteUser = () => {
  const userRepository = new UserRepository();
  const useCase = new DeleteUserUseCase(userRepository);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
    },
  });
};
