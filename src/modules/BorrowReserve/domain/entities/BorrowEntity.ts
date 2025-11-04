export interface BorrowRequest {
  times_renewable: number;
  fine_enabled: boolean;
  due_date: string;
  user_uuid: string;
}

export interface BorrowResponse {
  // {
  // "id": 0,
  // "user_id": "string",
  // "book_copy_id": 0,
  // "fine_accumulated": 0,
  // "times_renewable": 0,
  // "times_renewed": 0,
  // "due_date": "2025-10-15T10:35:18.744Z",
  // "fine_status": "UNPAID",
  // "returned": true,
  // "returned_date": "2025-10-15T10:35:18.744Z",
  // "remark": "string",
  // "user": {
  //   "uuid": "string",
  //   "name": "string",
  //   "roll_number": "string",
  //   "email": "string",
  //   "role": "STUDENT",
  //   "graduating_year": "string",
  //   "image_url": "string",
  //   "user_metadata": {
  //     "additionalProp1": {}
  //   },
  //   "created_at": "2025-10-15T10:35:18.744Z",
  //   "updated_at": "2025-10-15T10:35:18.744Z"
  // },
  // "book_copy": {
  //   "id": 0,
  //   "book_id": 0,
  //   "unique_identifier": "string",
  //   "condition": "string",
  //   "is_available": true,
  //   "book": {
  //     "id": 0,
  //     "title": "string",
  //     "author": "string",
  //     "publication": "string",
  //     "isbn": "string",
  //     "category": "ACADEMIC",
  //     "grade": "string",
  //     "cover_image_url": "string"
  //   }
  // }
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
