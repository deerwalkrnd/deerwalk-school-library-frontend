import { UserResponse } from "@/modules/Librarian/Users/domain/entities/UserEntity";

export interface FeedbackResponse {
  id: number;
  subject: string;
  feedback: string;
  user_id: string;
  is_acknowledged: boolean;
  user: UserResponse;
  created_at: string;
}
