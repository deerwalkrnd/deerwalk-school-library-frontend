import { Paginated } from "@/core/lib/Pagination";
import { GenreRequest } from "../entities/genreModal";

export default interface IGenresRepository {
  getGenres(params?: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<GenreRequest>>;
  addGenre(payload: GenreRequest): Promise<any>;
  updateGenre(payload: GenreRequest): Promise<any>;
  getGenreById(id: number): Promise<GenreRequest>;
  deleteGenre(id: number): Promise<any>;
}
