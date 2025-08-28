import ILibraryStatsResponse from "../entities/ILibraryStatsResponse";

export default interface IDashboardRepository {
  getLibraryStats(): Promise<ILibraryStatsResponse>;
  getTopOverdues(): Promise<any>;
  getTopBooksBorrowed(): Promise<any>;
  getRecentlyIssuedBooks(): Promise<any>;
}
