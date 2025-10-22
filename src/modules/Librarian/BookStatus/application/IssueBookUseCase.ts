import { UseCaseError } from "@/core/lib/UseCaseError";
import {
  BorrowRequest,
  RenewRequest,
  ReturnRequest,
} from "../domain/entities/IssueEntity";
import IissueRepository from "../domain/repositories/IIssueBookRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { IssueBookRepository } from "../infra/IssueBookRepository";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class BorrowBookUseCase {
  constructor(private issueRepository: IissueRepository) {}

  async execute(id: number, payload: BorrowRequest) {
    try {
      return await this.issueRepository.borrowBook(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to borrow book");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useBorrowBook = (repository?: IissueRepository) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new BorrowBookUseCase(issueRepository);
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: BorrowRequest }) =>
      useCase.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BORROWBOOKS] });
    },
  });
};

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
  const queryClient = new QueryClient();

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

  async execute() {
    try {
      return await this.issueRepository.getBookBorrows();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch borrow requests");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

export const useGetBookBorrows = (repository?: IissueRepository) => {
  const issueRepository = repository || new IssueBookRepository();
  const useCase = new GetBookBorrowsUseCase(issueRepository);

  return useQuery({
    queryKey: [QueryKeys.BORROWBOOKS],
    queryFn: () => useCase.execute(),
  });
};
