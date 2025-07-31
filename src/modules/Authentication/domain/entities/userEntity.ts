export interface UserRequest {
  email: string;
  password: string;
}

interface UserMetadata {
  [key: string]: any;
}

export interface User {
  uuid: string;
  name: string;
  roll_number: string;
  email: string;
  role: "STUDENT";
  graduating_year: string;
  user_metadata: UserMetadata;
  image_url: string;
  created_at: string;
  updated_at: string;
}
