import type { User } from "@/modules/Authentication/domain/entities/userEntity";
import type { BookCategory } from "@/modules/BookPage/domain/entities/bookModal";

export interface ReviewEntity {
  id: number;
  username: string;
  avatar?: string;
  content: string;
}

export interface ReviewPayload {
  book_id: number;
  user_id: string;
  review_text: string;
  is_spam: false;
}

export interface ReviewResponseBook {
  id: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: BookCategory;
  grade: string;
  cover_image_url: string;
}

export type ReviewResponseUser = User;

export interface CreateReviewResponse {
  id: number;
  book_id: number;
  user_id: string;
  review_text: string;
  is_spam: boolean;
  user: ReviewResponseUser;
  book: ReviewResponseBook;
}

export interface SpamPayload {
  is_spam: boolean;
}
