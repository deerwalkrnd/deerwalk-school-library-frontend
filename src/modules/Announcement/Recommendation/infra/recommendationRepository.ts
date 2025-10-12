import { Paginated } from "@/core/lib/Pagination";
import {
  RecommendationRequest,
  RecommendationResponse,
} from "../entities/RecommendationEntity";
import IRecommendationRepository from "../repository/IrecommendationRepository";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
