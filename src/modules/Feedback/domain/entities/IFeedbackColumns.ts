export interface IFeedbackColumns {
  id?: number;
  student_name: string;
  subject: string;
  feedback?: string;
  user_id?: string;
  is_acknowledged?: boolean;
  date: string;
}
