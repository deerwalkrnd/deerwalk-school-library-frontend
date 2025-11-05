import { RepositoryError } from "@/core/lib/RepositoryError";
import type ILibraryStatsResponse from "../domain/entities/ILibraryStatsResponse";
import type { ITopBooksBorrowed } from "../domain/entities/ITopBooksBorrowed";
import type { IRecentlyIssuedBooks } from "../domain/entities/IRecentlyIssuedBooks";
import type { TopOverDues } from "../domain/entities/TopOverdues";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { useQuery } from "@tanstack/react-query";
import { DashboardRepository } from "../infra/repositories/dashboardRepository";
import { QueryKeys } from "@/core/lib/queryKeys";
import IDashboardRepository from "../domain/repositories/IDashboardRepository";
import { da } from "date-fns/locale";

export class GetDashboardStatsUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<ILibraryStatsResponse> {
    try {
      return await this.dashboardRepository.getLibraryStats();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch library statistics");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export class GetTopOverduesUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<TopOverDues[]> {
    try {
      return await this.dashboardRepository.getTopOverdues();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch top overdue books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export class GetTopBooksBorrowedUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<ITopBooksBorrowed[]> {
    try {
      return await this.dashboardRepository.getTopBooksBorrowed();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch top borrowed books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export class GetRecentlyIssuedBooksUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<IRecentlyIssuedBooks[]> {
    try {
      return await this.dashboardRepository.getRecentlyIssuedBooks();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch recently issued books");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useDashboardStats = () => {
  const dashboardRepository = new DashboardRepository();
  const useCase = new GetDashboardStatsUseCase(dashboardRepository);

  return useQuery({
    queryKey: [QueryKeys.DASHBOARDSTATS],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTopOverdues = () => {
  const dashboardRepository = new DashboardRepository();
  const useCase = new GetTopOverduesUseCase(dashboardRepository);

  return useQuery({
    queryKey: [QueryKeys.TOPOVERDUES],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTopBorrowedBooks = () => {
  const dashboardRepository = new DashboardRepository();
  const useCase = new GetTopBooksBorrowedUseCase(dashboardRepository);

  return useQuery({
    queryKey: [QueryKeys.TOPBOOKSBORROWED],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentlyIssuedBooks = () => {
  const dashboardRepository = new DashboardRepository();
  const useCase = new GetRecentlyIssuedBooksUseCase(dashboardRepository);

  return useQuery({
    queryKey: [QueryKeys.RECENTLYISSUEDBOOKS],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDashboard = () => {
  return useDashboardStats();
};
