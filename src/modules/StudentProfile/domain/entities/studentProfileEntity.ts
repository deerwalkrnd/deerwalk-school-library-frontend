export interface StudentProfileData {
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallBack: string;
  totalBooksBorrowed: number;
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
