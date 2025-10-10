import { RepositoryError } from "@/core/lib/RepositoryError";
import { QuoteRequest, QuoteResponse } from "../domain/entities/QuoteEntity";
import IQuoteRepository from "../domain/repository/IquoteRepository";
import { QuoteRepository } from "../infra/quoteRepository";
import { UseCaseError } from "@/core/lib/UseCaseError";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { Paginated } from "@/core/lib/Pagination";

export class GetQuotesUseCase {
  constructor(private QuoteRepository: IQuoteRepository) {}

  async execute(params?: any): Promise<Paginated<QuoteResponse>> {
    try {
      return await this.QuoteRepository.getQuotes(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Fai+led to fetch quotes");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class AddQuoteUseCase {
  constructor(private QuoteRepository: IQuoteRepository) {}

  async execute(payload: QuoteRequest): Promise<QuoteResponse> {
    try {
      return await this.QuoteRepository.addQuote(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to add quote");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class DeleteQuoteUseCase {
  constructor(private QuoteRepository: IQuoteRepository) {}
  async execute(id: string): Promise<string> {
    try {
      return await this.QuoteRepository.deleteQuote(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete quote");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export const useGetQuotes = (params?: { page?: number; limit?: number }) => {
  const quoteRepository = new QuoteRepository();
  const useCase = new GetQuotesUseCase(quoteRepository);
  return useQuery({
    queryKey: [QueryKeys.QUOTES, params?.page, params?.limit],
    queryFn: () => useCase.execute(params),
    retry: 3,
  });
};

export const useAddQuote = () => {
  const queryClient: QueryClient = useQueryClient();
  const quoteRepository = new QuoteRepository();
  const useCase = new AddQuoteUseCase(quoteRepository);
  return useMutation({
    mutationFn: (payload: QuoteRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QUOTES] });
    },
  });
};

export const useDeleteQuote = () => {
  const queryClient: QueryClient = useQueryClient();
  const quoteRepository = new QuoteRepository();
  const useCase = new DeleteQuoteUseCase(quoteRepository);
  return useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QUOTES] });
    },
  });
};
