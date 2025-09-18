export interface IUserColumns {
  uuid: string;
  name: string;
  roll_number: string | null;
  email: string;
  role: string;
  graduating_year: string | null;
  image_url: string | null;
  user_metadata?: any;
  created_at: string;
  updated_at: string;
}
