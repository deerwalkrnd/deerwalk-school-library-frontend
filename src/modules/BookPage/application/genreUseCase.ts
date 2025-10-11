// modules/Genres/application/genreUseCase.ts
import { Paginated } from "@/core/lib/Pagination";
import { UseCaseError } from "@/core/lib/UseCaseError";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { GenrePayload, GenreRequest } from "../domain/entities/genreModal";
import IGenresRepository from "../domain/repositories/IGenreRepository";
import { GenresRepository } from "../infra/repositories/genreRepository";

export class GetGenresUseCase {
  constructor(private repo: IGenresRepository) {}
  async execute(params?: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<GenreRequest>> {
    try {
      return await this.repo.getGenres(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch genres");
      }
      throw new UseCaseError(
        `Unexpected error: ${error?.message ?? String(error)}`,
      );
    }
  }
}

export class AddGenreUseCase {
  constructor(private repo: IGenresRepository) {}
  async execute(payload: GenrePayload): Promise<GenreRequest> {
    try {
      return await this.repo.addGenre(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to create genre");
      }
      throw new UseCaseError(
        `Unexpected error: ${error?.message ?? String(error)}`,
      );
    }
  }
}

export class UpdateGenreUseCase {
  constructor(private repo: IGenresRepository) {}
  async execute(id: number, payload: GenrePayload): Promise<GenreRequest> {
    try {
      return await this.repo.updateGenre(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to update genre");
      }
      throw new UseCaseError(
        `Unexpected error: ${error?.message ?? String(error)}`,
      );
    }
  }
}

export class DeleteGenreUseCase {
  constructor(private repo: IGenresRepository) {}
  async execute(id: number): Promise<string> {
    try {
      return await this.repo.deleteGenre(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete genre");
      }
      throw new UseCaseError(
        `Unexpected error: ${error?.message ?? String(error)}`,
      );
    }
  }
}

export class GetGenreByIdUseCase {
  constructor(private repo: IGenresRepository) {}
  async execute(id: number): Promise<GenreRequest> {
    try {
      return await this.repo.getGenreById(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch genre");
      }
      throw new UseCaseError(
        `Unexpected error: ${error?.message ?? String(error)}`,
      );
    }
  }
}

export const getGenres = (params?: { page?: number; limit?: number }) => {
  const repo = new GenresRepository();
  const useCase = new GetGenresUseCase(repo);

  return useQuery({
    queryKey: [QueryKeys.GENRES, params?.page, params?.limit],
    queryFn: () => useCase.execute(params),
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddGenre = () => {
  const repo = new GenresRepository();
  return useMutation({
    mutationFn: (payload: { title: string; image_url: string }) =>
      repo.addGenre(payload),
  });
};

export const updateGenre = () => {
  const repo = new GenresRepository();
  const useCase = new UpdateGenreUseCase(repo);
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: GenrePayload }) =>
      useCase.execute(id, payload),
  });
};

export const deleteGenre = () => {
  const repo = new GenresRepository();
  const useCase = new DeleteGenreUseCase(repo);
  return useMutation({
    mutationFn: (id: number) => useCase.execute(id),
  });
};

export const getGenreById = (id: number) => {
  const repo = new GenresRepository();
  const useCase = new GetGenreByIdUseCase(repo);
  return useQuery({
    queryKey: [QueryKeys.GENRES, id],
    queryFn: () => useCase.execute(id),
    enabled: Number.isFinite(id),
    retry: 3,
  });
};
