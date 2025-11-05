import { ReserveRepository } from "./../infra/ReserveRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { QueryParams } from "@/core/lib/QueryParams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetReservedBooksUseCase {
  constructor(private ReserveRepository: IReserveRepository) {}

  async execute(params?: any) {
    try {
      return await this.ReserveRepository.getReserves(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch reserved books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const getReservedBooks = (params?: QueryParams, key?: any) => {
  const reserveRepository = new ReserveRepository();
  const useCase = new GetReservedBooksUseCase(reserveRepository);
  return useQuery({
    queryKey: [QueryKeys.RESERVES, key, params],
    queryFn: () => useCase.execute(params),
  });
};

export class ReserveBookUseCase {
  constructor(private ReserveRepository: IReserveRepository) {}

  async execute(id: number) {
    try {
      return await this.ReserveRepository.reserveBook(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to reserve book");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useReserveBook = () => {
  const reserveRepository = new ReserveRepository();
  const useCase = new ReserveBookUseCase(reserveRepository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AVAILABLECOPIES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKS] });
    },
  });
};

export class DeleteReservationUseCase {
  constructor(private ReserveRepository: IReserveRepository) {}

  async execute(id: number) {
    try {
      return await this.ReserveRepository.deleteReserve(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to delete reserved book");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useDeleteReservedBook = () => {
  const reserveRepository = new ReserveRepository();
  const useCase = new DeleteReservationUseCase(reserveRepository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => useCase.execute(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVES] }),
  });
};

export class GetReserveStatusUseCase {
  constructor(private ReserveRepository: IReserveRepository) {}

  async execute(id: number) {
    try {
      return await this.ReserveRepository.getReservationStatus(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch reserved book status");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const getReservedBookStatus = (id: number) => {
  const reserveRepository = new ReserveRepository();
  const useCase = new GetReservedBooksUseCase(reserveRepository);
  return useQuery({
    queryKey: [QueryKeys.RESERVES, id],
    queryFn: () => useCase.execute(id),
  });
};

export class BorrowReservedBookUseCase {
  constructor(private ReserveRepository: IReserveRepository) {}

  async execute(id: number) {
    try {
      return await this.ReserveRepository.borrowReservedBook(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to borrow reserved books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useBorrowReservedBook = () => {
  const reserveRepository = new ReserveRepository();
  const useCase = new BorrowReservedBookUseCase(reserveRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => useCase.execute(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVES] }),
  });
};
