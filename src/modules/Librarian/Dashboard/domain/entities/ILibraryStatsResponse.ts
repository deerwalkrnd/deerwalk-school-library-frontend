export default interface ILibraryStatsResponse {
  overdueBooks: number;
  totalBooksIssued: number;
  totalReturnedBooks: number;
  totalBooks: number;
  visitors: number;
  pendingFines: number;
}
