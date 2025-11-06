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
import { QueryParams } from "@/core/lib/QueryParams";

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
export class AddRandomQuoteUseCase {
  constructor(private QuoteRepository: IQuoteRepository) {}
  async execute(): Promise<QuoteResponse> {
    try {
      return await this.QuoteRepository.addRandomQuote();
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to add random quote");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
export class UpdateQuoteUseCase {
  constructor(private QuoteRepository: IQuoteRepository) {}
  async execute(payload: QuoteRequest): Promise<QuoteResponse> {
    try {
      return await this.QuoteRepository.updateQuote(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to update quote");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}

export class DeleteQuoteUseCase {
  constructor(private QuoteRepository: IQuoteRepository) {}
  async execute(id: number): Promise<string> {
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

export const useGetQuotes = (params?: QueryParams) => {
  const quoteRepository = new QuoteRepository();
  const useCase = new GetQuotesUseCase(quoteRepository);
  return useQuery({
    queryKey: [QueryKeys.QUOTES, params],
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
    mutationFn: (id: number) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QUOTES] });
    },
  });
};

export const useUpdateQuote = () => {
  const queryClient: QueryClient = useQueryClient();
  const quoteRepository = new QuoteRepository();
  const useCase = new UpdateQuoteUseCase(quoteRepository);
  return useMutation({
    mutationFn: (payload: QuoteRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QUOTES] });
    },
  });
};

export const useAddRandomQuote = () => {
  const queryClient: QueryClient = useQueryClient();
  const quoteRepository = new QuoteRepository();
  const useCase = new AddRandomQuoteUseCase(quoteRepository);
  return useMutation({
    mutationFn: () => useCase.execute(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QUOTES] });
    },
  });
};
