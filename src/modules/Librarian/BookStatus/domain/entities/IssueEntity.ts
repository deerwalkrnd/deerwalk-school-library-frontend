import { User } from "@/modules/Authentication/domain/entities/userEntity";
import { BookCopy } from "@/modules/BookPage/domain/entities/bookModal";

export interface BorrowRequest {
  times_renewable: number;
  fine_enabled: boolean;
  due_date: string;
  user_uuid: string;
}

export interface BorrowResponse {
  id: number;
  user_id: string;
  book_copy_id: number;
  fine_accumulated: number;
  times_renewable: number;
  times_renewed: number;
  fine_rate: number;
  due_date: string;
  fine_status: string;
  returned: boolean;
  returned_date: string | null;
  remark: string | null;
  user: User;
  book_copy: BookCopy;
}

export interface RenewRequest {
  new_due_date: string;
  fine_collected: number;
}

export interface ReturnRequest {
  fine_paid: boolean;
  returned_date: string;
  remark: string;
}
