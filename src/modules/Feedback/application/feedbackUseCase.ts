import { FeedbackRepository } from "../infra/repositories/feedbackRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { FeedbackResponse } from "../domain/entities/FeedbackResponse";
import IFeedbackRepository from "../domain/repositories/IFeedbackRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import {
  FeedbackQueryParams,
  FeedbackRequest,
} from "../domain/entities/FeedbackRequest";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IFeedbackColumns } from "../domain/entities/IFeedbackColumns";

export class GetFeedbacksUseCase {
  constructor(private FeedbackRepository: IFeedbackRepository) {}

  async execute(params?: FeedbackQueryParams): Promise<IFeedbackColumns[]> {
    try {
      return await this.FeedbackRepository.getFeedbacks(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class UpdateFeedbackUseCase {
  constructor(private FeedbackRepository: IFeedbackRepository) {}

  async execute(payload: FeedbackRequest): Promise<FeedbackResponse> {
    try {
      return await this.FeedbackRepository.updateFeedback(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch feedback");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class SendFeedbackUseCase {
  constructor(private FeedbackRepository: IFeedbackRepository) {}

  async execute(payload: FeedbackRequest): Promise<FeedbackResponse> {
    try {
      return await this.FeedbackRepository.sendFeedback(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to send feedback");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useFeedbacks = (params?: FeedbackQueryParams) => {
  const feedbackRepository = new FeedbackRepository();
  const useCase = new GetFeedbacksUseCase(feedbackRepository);
  return useQuery({
    queryKey: [QueryKeys.FEEDBACKS, params],
    queryFn: () => useCase.execute(params),
    retry: 3,
    // staleTime: 1000 * 60, 1 min cache
  });
};

export const useUpdateFeedback = (repository?: IFeedbackRepository) => {
  const feedbackRepository = repository || new FeedbackRepository();
  const useCase = new UpdateFeedbackUseCase(feedbackRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }: { payload: FeedbackRequest }) =>
      useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FEEDBACKS] });
    },
  });
};

export const useSendFeedback = (repository?: IFeedbackRepository) => {
  const feedbackRepository = repository || new FeedbackRepository();
  const useCase = new SendFeedbackUseCase(feedbackRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FeedbackRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FEEDBACKS] });
    },
  });
};
