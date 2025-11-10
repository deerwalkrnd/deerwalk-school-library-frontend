import type {
  BorrowsResponse,
  GetCurrentBorrowsParams,
} from "../entities/studentProfileEntity";

export interface IBorrowsRepository {
  getCurrentBorrows(params?: GetCurrentBorrowsParams): Promise<BorrowsResponse>;
}
