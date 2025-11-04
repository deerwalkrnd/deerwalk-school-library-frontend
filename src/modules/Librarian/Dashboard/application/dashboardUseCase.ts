import { RepositoryError } from "@/core/lib/RepositoryError";
import type ILibraryStatsResponse from "../domain/entities/ILibraryStatsResponse";
import type { ITopBooksBorrowed } from "../domain/entities/ITopBooksBorrowed";
import type { IRecentlyIssuedBooks } from "../domain/entities/IRecentlyIssuedBooks";
import type { TopOverDues } from "../domain/entities/TopOverdues";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { useQuery } from "@tanstack/react-query";
import { DashboardRepository } from "../infra/repositories/dashboardRepository";

export class GetDashboardStatsUseCase {
  constructor(private dashboardRepository = new DashboardRepository()) {}

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
  constructor(private dashboardRepository = new DashboardRepository()) {}

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
  constructor(private dashboardRepository = new DashboardRepository()) {}

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
  constructor(private dashboardRepository = new DashboardRepository()) {}

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
  const useCase = new GetDashboardStatsUseCase();

  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTopOverdues = () => {
  const useCase = new GetTopOverduesUseCase();

  return useQuery({
    queryKey: ["top-overdues"],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTopBorrowedBooks = () => {
  const useCase = new GetTopBooksBorrowedUseCase();

  return useQuery({
    queryKey: ["top-books-borrowed"],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentlyIssuedBooks = () => {
  const useCase = new GetRecentlyIssuedBooksUseCase();

  return useQuery({
    queryKey: ["recently-issued-books"],
    queryFn: () => useCase.execute(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDashboard = () => {
  return useDashboardStats();
};
