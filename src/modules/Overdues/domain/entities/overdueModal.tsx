export interface OverDues {
  id: number;
  studentName: string;
  bookTitle: string;
  author: string;
  bookNumber: string;
  isbn: string;
  borrowedDate: string;
  returnDate: string;
  overdueDays: number;
  fineAmount: number;
}

export interface OverdueResponse {
  overdues: OverDues[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
