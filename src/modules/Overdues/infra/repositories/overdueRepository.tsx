import type {
  OverdueResponse,
  OverDues,
  PaginationParams,
} from "@/modules/Overdues/domain/entities/overdueModal";

import type { IOverdueRepository } from "@/modules/Overdues/domain/repositories/IOverdueRepositories";

export class OverdueRepository implements IOverdueRepository {
  private readonly API_URL = "/api/overdue";

  async getAllOverdues(pagination: PaginationParams): Promise<OverdueResponse> {
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
      search: pagination.search ?? "",
      sortBy: pagination.sortBy ?? "studentName",
      sortOrder: pagination.sortOrder ?? "asc",
    });

    const response = await fetch(`${this.API_URL}?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch overdues");
    }
    return response.json();
  }

  async getOverdueById(id: string): Promise<OverDues> {
    const response = await fetch(`${this.API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch overdue");
    }
    return response.json();
  }
}
