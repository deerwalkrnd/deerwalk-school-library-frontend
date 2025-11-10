import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { Paginated } from "@/core/lib/Pagination";
import IRecommendationRepository from "../domain/repository/IrecommendationRepository";
import { keepPreviousData } from "@tanstack/react-query";
import {
  RecommendationRequest,
  RecommendationResponse,
} from "../domain/entities/RecommendationEntity";
import { RecommendationRepository } from "./../infra/recommendationRepository";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { QueryParams } from "@/core/lib/QueryParams";

export class GetRecommendationsUseCase {
  constructor(private RecommendationRepository: IRecommendationRepository) {}
  async execute(params?: any): Promise<Paginated<RecommendationResponse>> {
    try {
      return await this.RecommendationRepository.getRecommendations(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch recommendations");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
export class AddRecommendationUseCase {
  constructor(private RecommendationRepository: IRecommendationRepository) {}
  async execute(
    payload: RecommendationRequest,
  ): Promise<RecommendationResponse> {
    try {
      return await this.RecommendationRepository.addRecommendation(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to add recommendation");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
export class UpdateRecommendationUseCase {
  constructor(private RecommendationRepository: IRecommendationRepository) {}
  async execute(
    payload: RecommendationRequest,
  ): Promise<RecommendationResponse> {
    try {
      return await this.RecommendationRepository.updateRecommendation(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to update recommendation");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
export class DeleteRecommendationUseCase {
  constructor(private RecommendationRepository: IRecommendationRepository) {}
  async execute(id: number): Promise<string> {
    try {
      return await this.RecommendationRepository.deleteRecommendation(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete recommendation");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const getRecommendations = (params?: QueryParams) => {
  const recommendationRepository = new RecommendationRepository();
  const getRecommendationsUseCase = new GetRecommendationsUseCase(
    recommendationRepository,
  );
  return useQuery({
    queryKey: [QueryKeys.RECOMMENDATIONS, params],
    queryFn: () => getRecommendationsUseCase.execute(params),
    placeholderData: keepPreviousData,
    retry: 3,
  });
};
export const addRecommendation = () => {
  const recommendationRepository = new RecommendationRepository();
  const addRecommendationUseCase = new AddRecommendationUseCase(
    recommendationRepository,
  );
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecommendationRequest) =>
      addRecommendationUseCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RECOMMENDATIONS] });
    },
  });
};
export const updateRecommendation = () => {
  const recommendationRepository = new RecommendationRepository();
  const updateRecommendationUseCase = new UpdateRecommendationUseCase(
    recommendationRepository,
  );
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecommendationRequest) =>
      updateRecommendationUseCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.RECOMMENDATIONS],
      });
    },
  });
};
export const deleteRecommendation = () => {
  const recommendationRepository = new RecommendationRepository();
  const deleteRecommendationUseCase = new DeleteRecommendationUseCase(
    recommendationRepository,
  );
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRecommendationUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RECOMMENDATIONS] });
    },
  });
};
