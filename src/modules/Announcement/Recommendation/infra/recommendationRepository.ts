// import { Paginated } from "@/core/lib/Pagination";
// import {
//   RecommendationRequest,
//   RecommendationResponse,
// } from "../domain/entities/RecommendationEntity";
// import IRecommendationRepository from "../domain/repository/IrecommendationRepository";
// import { RepositoryError } from "@/core/lib/RepositoryError";
// import { UseCaseError } from "@/core/lib/UseCaseError";

// export class RecommendationRespository implements IRecommendationRepository {

// }

// async getRecommendations(params?: any): Promise<Paginated<RecommendationResponse>> {
//   try {
//     // Implement the logic to fetch recommendations from your data source
//     // For example, using an API call or database query
//     const response = await fetch("/api/recommendations", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // You can include params in the request if needed
//     });

//     if (!response.ok) {
//       throw new RepositoryError("Failed to fetch recommendations");
//     }

//     const data = await response.json();
//     return data as Paginated<RecommendationResponse>;
//   } catch (error: any) {
//     if (error instanceof RepositoryError) {
//       throw error;
//     }
//     throw new RepositoryError(`Unexpected error: ${error.message}`);
//   }
// }

// async addRecommendation(
//   payload: RecommendationRequest
// ): Promise<RecommendationResponse> {
//   try {
//     // Implement the logic to add a new recommendation to your data source
//     const response = await fetch("/api/recommendations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new RepositoryError("Failed to add recommendation");
//     }

//     const data = await response.json();
//     return data as RecommendationResponse;
//   } catch (error: any) {
//     if (error instanceof RepositoryError) {
//       throw error;
//     }
//     throw new RepositoryError(`Unexpected error: ${error.message}`);
//   }
// }

// async deleteRecommendation(id: string): Promise<string> {
//   try {
//     // Implement the logic to delete a recommendation from your data source
//     const response = await fetch(`/api/recommendations/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new RepositoryError("Failed to delete recommendation");
//     }

//     return id;
//   } catch (error: any) {
//     if (error instanceof RepositoryError) {
//       throw error;
//     }
//     throw new RepositoryError(`Unexpected error: ${error.message}`);
//   }
// }

// // You can implement additional methods as needed
// // For example, updateRecommendation, getRecommendationById, etc.
// // Make sure to handle errors appropriately and return the expected types
// // according to the IRecommendationRepository interface.
// // ...existing code...
