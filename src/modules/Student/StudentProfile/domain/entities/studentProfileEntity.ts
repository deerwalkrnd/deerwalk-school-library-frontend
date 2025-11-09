export interface StudentProfileData {
  uuid?: string;
  roll_number?: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallBack: string;
  totalBooksBorrowed: number;
  userMedatadata: any;
  totalReturnedBooks: number;
  fineLevied: number;
  currentlyReading: BookData[];
  borrowedHistory: BookData[];
  myBookmarks: BookData[];
}

export interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  borrowedDate?: string;
  dueDate?: string;
  isOverdue?: boolean;
  isBookmarked?: boolean;
}

export interface BookmarkItem {
  id: number;
  user_id: string;
  book_id: number;
  book: {
    id: number;
    title: string;
    author: string;
    publication: string;
    isbn: string;
    category: string;
    grade: string;
    cover_image_url: string;
  };
}

export interface BookmarksResponse {
  page: number;
  total: number;
  next: number | null;
  items: BookmarkItem[];
}

export interface BorrowItem {
  id: number;
  user_id: string;
  book_copy_id: number;
  fine_accumulated: number;
  times_renewable: number;
  times_renewed: number;
  due_date: string;
  fine_status: string;
  fine_rate: number;
  returned: boolean;
  returned_date: string | null;
  remark: string;
  created_at: string;
  user: {
    uuid: string;
    name: string;
    roll_number: string;
    email: string;
    role: string;
    graduating_year: string;
    image_url: string;
    user_metadata: any;
    created_at: string;
    updated_at: string;
  };
  book_copy: {
    id: number;
    book_id: number;
    unique_identifier: string;
    condition: string;
    is_available: boolean;
    book: {
      id: number;
      title: string;
      author: string;
      publication: string;
      isbn: string;
      category: string;
      grade: string;
      cover_image_url: string;
    };
  };
}

export interface BorrowsResponse {
  page: number;
  total: number;
  next: number | null;
  items: BorrowItem[];
}

export interface GetCurrentBorrowsParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  is_descending?: boolean;
  searchable_value?: string;
  searchable_field?: string;
  starts?: string;
  ends?: string;
}
