import { Paginated } from "@/core/lib/Pagination";
import {
  RecommendationRequest,
  RecommendationResponse,
} from "../entities/RecommendationEntity";

export default interface IRecommendationRepository {
  getRecommendations(params?: any): Promise<Paginated<RecommendationResponse>>;
  addRecommendation(
    payload: RecommendationRequest,
  ): Promise<RecommendationResponse>;
  updateRecommendation(
    payload: RecommendationRequest,
  ): Promise<RecommendationResponse>;
  deleteRecommendation(id: string): Promise<string>;
}
