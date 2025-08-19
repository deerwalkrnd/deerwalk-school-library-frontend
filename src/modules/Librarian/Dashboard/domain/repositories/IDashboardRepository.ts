import ILibraryStatsResponse from "../entities/ILibraryStatsResponse";

export default interface IDashboardRepository {
  getLibraryStats(): Promise<ILibraryStatsResponse>;
}
