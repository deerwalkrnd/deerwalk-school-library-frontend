export interface TopOverDues {
  id?: number;
  student_name: string;
  overdue_days: number;
  borrowed_date: string | Date;
  due_date: string | Date;
  created_at: string;
  book_copy?: {
    book?: {
      title?: string;
      author?: string;
    };
  };
}
