export default interface ILibraryStatsResponse {
  totalBooksBorrowed: number;
  totalReturnedBooks: number;
  overdueBooks: number;
  fineLevied: number;
  savedBooks: number;
  mostBorrowedCategory: string;
}
