import { QueryParams } from "@/core/lib/QueryParams";
import { UseCaseError } from "@/core/lib/UseCaseError";
import {
  BorrowRequest,
  BorrowResponse,
  RenewRequest,
  ReturnRequest,
} from "../domain/entities/IssueEntity";
import IissueRepository from "../domain/repositories/IIssueBookRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { IssueBookRepository } from "../infra/IssueBookRepository";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { Paginated } from "@/core/lib/Pagination";

export class GetOneBorrowUseCase {
  constructor(private issueRepository: IissueRepository) {}

  async execute(id: number) {
    try {
      return await this.issueRepository.getOneBorrow(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch borrow details");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useGetOneBorrow = (id: number, repository?: IissueRepository) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new GetOneBorrowUseCase(issueRepository);

  return useQuery({
    queryKey: [QueryKeys.BORROWBOOKS, id],
    queryFn: () => useCase.execute(id),
    enabled: !!id,
  });
};

export class RenewBorrowedBookUseCase {
  constructor(private issueRepository: IissueRepository) {}

  async execute(id: number, payload: RenewRequest) {
    try {
      return await this.issueRepository.renewBorrowedBook(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to renew borrowed book");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useRenewBorrowedBook = (repository?: IissueRepository) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new RenewBorrowedBookUseCase(issueRepository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RenewRequest }) =>
      useCase.execute(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BORROWBOOKS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BORROWBOOKS, id] });
    },
  });
};

export class ReturnBookUseCase {
  constructor(private issueRepository: IissueRepository) {}

  async execute(id: number, payload: ReturnRequest) {
    try {
      return await this.issueRepository.returnBook(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to return book");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useReturnBook = (repository?: IissueRepository) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new ReturnBookUseCase(issueRepository);
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ReturnRequest }) =>
      useCase.execute(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BORROWBOOKS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BORROWBOOKS, id] });
    },
  });
};

export class GetBookBorrowsUseCase {
  constructor(private issueRepository: IissueRepository) {}

  async execute(params?: any): Promise<Paginated<BorrowResponse>> {
    try {
      return await this.issueRepository.getBookBorrows(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch borrow requests");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useGetBookBorrows = (
  params?: QueryParams,
  key?: any,
  repository?: IissueRepository,
) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new GetBookBorrowsUseCase(issueRepository);

  return useQuery({
    queryKey: [QueryKeys.BORROWBOOKS, params, key],
    queryFn: () => useCase.execute(params),
  });
};

export class GetBorrowsHistoryUseCase {
  constructor(private issueRepository: IissueRepository) {}

  async execute(params?: any): Promise<Paginated<BorrowResponse>> {
    try {
      return await this.issueRepository.getBorrowsHistory(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch borrow history");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useGetBorrowHistory = (
  params?: QueryParams,
  key?: any,
  repository?: IissueRepository,
) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new GetBookBorrowsUseCase(issueRepository);

  return useQuery({
    queryKey: [QueryKeys.BORROWBOOKSHISTORY, params, key],
    queryFn: () => useCase.execute(params),
  });
};
