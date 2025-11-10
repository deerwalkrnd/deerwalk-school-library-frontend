import { Paginated } from "@/core/lib/Pagination";
import {
  CreateReviewResponse,
  ReviewPayload,
  SpamPayload,
} from "../domain/entities/ReviewEntity";
import IReviewRepository from "../domain/repository/IreviewRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { ReviewRepository } from "../infra/ReviewRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";

export class GetBookReviewsUseCase {
  constructor(private ReviewRepository: IReviewRepository) {}

  async execute(
    book_id: number,
    isSpam?: boolean,
    sortBy?: "newest" | "oldest",
    page?: number,
    limit?: number,
  ): Promise<Paginated<CreateReviewResponse>> {
    try {
      return await this.ReviewRepository.getReviewsByBookId(book_id, {
        isSpam,
        sortBy,
        page,
        limit,
      });
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class GetReviewCountUseCase {
  constructor(private ReviewRepository: IReviewRepository) {}

  async execute(book_id: number): Promise<number> {
    try {
      return this.ReviewRepository.getReviewCount(book_id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class MarkSpamUseCase {
  constructor(private ReviewRepository: IReviewRepository) {}
  async execute(id: number, payload: SpamPayload) {
    try {
      return this.ReviewRepository.markSpam(id, payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class CreateBookReviewUseCase {
  constructor(private ReviewRepository: IReviewRepository) {}
  async execute(payload: ReviewPayload) {
    try {
      return this.ReviewRepository.createReview(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch feedbacks");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useGetReviews = (
  id: number,
  isSpam?: boolean,
  sortBy?: "newest" | "oldest",
  page?: number,
  limit?: number,
  repository?: IReviewRepository,
) => {
  const reviewRepository = repository || new ReviewRepository();
  const useCase = new GetBookReviewsUseCase(reviewRepository);
  return useQuery({
    queryKey: [QueryKeys.REVIEWS, id, isSpam, sortBy, page, limit],
    queryFn: () => useCase.execute(id, isSpam, sortBy, page, limit),
  });
};

export const useCreateReview = (repository?: IReviewRepository) => {
  const reviewRepository = repository || new ReviewRepository();
  const useCase = new CreateBookReviewUseCase(reviewRepository);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReviewPayload) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.REVIEWS] });
    },
  });
};

export const useMarkSpam = (repository?: IReviewRepository) => {
  const reviewRepository = repository || new ReviewRepository();
  const useCase = new MarkSpamUseCase(reviewRepository);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: SpamPayload }) =>
      useCase.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.REVIEWS] });
    },
  });
};

export const useGetReviewCount = (
  id: number,
  repository?: IReviewRepository,
) => {
  const reviewRepository = repository || new ReviewRepository();
  const useCase = new GetReviewCountUseCase(reviewRepository);

  return useQuery({
    queryKey: [QueryKeys.REVIEWS, id],
    queryFn: () => useCase.execute(id),
  });
};
