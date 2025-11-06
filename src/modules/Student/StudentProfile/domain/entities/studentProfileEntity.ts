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
  isOverdue?: string;
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
