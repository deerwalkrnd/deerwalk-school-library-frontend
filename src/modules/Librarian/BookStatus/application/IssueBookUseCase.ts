import { Paginated } from "@/core/lib/Pagination";
import IissueRepository from "../domain/repositories/IIssueBookRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { IssueBookRepository } from "../infra/IssueBookRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetIssueBookUseCase {
  constructor(private IssueRepository: IissueRepository) {}

  async execute(params?: any): Promise<Paginated<any>> {
    try {
      return await this.IssueRepository.getIssues();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch issues");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class UpdateIssueUseCase {
  constructor(private IssueRepository: IissueRepository) {}

  async execute(payload: any): Promise<Paginated<any>> {
    try {
      return await this.IssueRepository.issueBook(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to issue book");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class DeleteIssueUseCase {
  constructor(private IssueRepository: IissueRepository) {}

  async execute(id: any): Promise<Paginated<any>> {
    try {
      return await this.IssueRepository.deleteIssue(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete issue");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const getIssueRequests = (params?: any) => {
  const issueBookRepository = new IssueBookRepository();

  const useCase = new GetIssueBookUseCase(issueBookRepository);
  return useQuery({
    queryKey: [QueryKeys.ISSUES, params],
    queryFn: () => useCase.execute(params),
    retry: 3,
  });
};

export const updateIssue = () => {
  const issueBookRepository = new IssueBookRepository();

  const useCase = new UpdateIssueUseCase(issueBookRepository);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ISSUES] });
    },
  });
};

export const deleteIssue = () => {
  const issueBookRepository = new IssueBookRepository();
  const useCase = new DeleteIssueUseCase(issueBookRepository);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ISSUES] });
    },
  });
};
