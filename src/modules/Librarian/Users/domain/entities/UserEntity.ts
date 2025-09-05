export interface UserRequest {
  name: string;
  roll_number: string;
  email: string;
  password: string;
  graduating_year: string;
  role: "STUDENT" | "LIBRARIAN";
  user_metadata?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
    [key: string]: string;
  };
}

export interface UserResponse {
  uuid: string;
  name: string;
  roll_number: string;
  email: string;
  role: "STUDENT" | "LIBRARIAN";
  graduating_year: string;
  image_url: string;
  user_metadata?: {
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
}
