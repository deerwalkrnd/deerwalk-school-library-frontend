export interface IReturnBookColumns {
  id: number;
  book_title: string;
  author: string;
  book_number: string;
  student_name: string;
  borrowed_date: string;
  return_date: string;
  fine_amount: number;
  fine_status: "PAID" | "UNPAID" | "NONE";
}
