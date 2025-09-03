import { FeedbackRepository } from "../infra/repositories/feedbackRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { FeedbackResponse } from "../domain/entities/FeedbackResponse";
import IFeedbackRepository from "../domain/repositories/IFeedbackRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { error } from "console";
import { FeedbackRequest } from "../domain/entities/FeedbackRequest";
import { QueryKeys } from "@/core/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export class GetFeedbacksUseCase {
  constructor(private FeedbackRepository: IFeedbackRepository) {}

  async execute(): Promise<FeedbackResponse[]> {
    try {
      return await this.FeedbackRepository.getFeedbacks();
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

  async execute(
    id: number,
    payload: FeedbackRequest,
  ): Promise<FeedbackResponse> {
    try {
      return await this.FeedbackRepository.updateFeedback(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedback");
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

export const useFeedbacks = (repository?: IFeedbackRepository) => {
  const feedbackRepository = repository || new FeedbackRepository();
  const useCase = new GetFeedbacksUseCase(feedbackRepository);

  return useQuery({
    queryKey: [QueryKeys.FEEDBACKS],
    queryFn: () => useCase.execute(),
    retry: 3,
    // staleTime: 1000 * 60, 1 min cache
  });
};

export const useUpdateFeedback = (
  id: number,
  payload: FeedbackRequest,
  repository?: IFeedbackRepository,
) => {
  const feedbackRepository = repository || new FeedbackRepository();
  const useCase = new UpdateFeedbackUseCase(feedbackRepository);
  return useQuery({
    queryKey: [QueryKeys.FEEDBACKS, id],
    queryFn: () => useCase.execute(id, payload),
    enabled: !!id,
    retry: 3,
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
