export interface IReserveRepository {
  reserveBook(book_copy_id: number): Promise<any>;
  getReserves(params?: any): Promise<any>;
  getReservationStatus(id: number): Promise<any>;
  deleteReserve(id: number): Promise<any>;
  borrowReservedBook(id: number): Promise<any>;
}
