import type {
  OverdueResponse,
  OverDues,
  PaginationParams,
} from "@/modules/Overdues/domain/entities/overdueModal";

export interface IOverdueRepository {
  getAllOverdues(pagination: PaginationParams): Promise<OverdueResponse>;
  getOverdueById(id: string): Promise<OverDues>;
}
