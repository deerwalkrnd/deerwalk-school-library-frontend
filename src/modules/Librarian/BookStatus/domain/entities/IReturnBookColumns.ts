export interface IReturnBookColumns {
  id: number;
  book_copy_id: number;
  book_title: string;
  author: string;
  publication: string;
  student_name: string;
  type: string;
  class: string;
  fine_status: string;
  times_renewable: number;
  times_renewed: number;
  fine_accumulated: number;
  returned: boolean;
  due_date: string;
}
