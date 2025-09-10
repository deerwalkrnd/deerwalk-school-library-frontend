import { UserResponse } from "@/modules/Librarian/Users/domain/entities/UserEntity";

export interface IFeedbackColumns {
  id?: number;
  student_name: string;
  subject: string;
  feedback?: string;
  user_id?: string;
  is_acknowledged?: boolean;
  user: UserResponse;
  created_at: string;
}
