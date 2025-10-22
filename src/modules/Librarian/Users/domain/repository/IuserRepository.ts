import type { Paginated } from "@/core/lib/Pagination";
import type { UserRequest, UserResponse } from "../entities/UserEntity";

export default interface IUserRepository {
  getUsers(params?: any): Promise<Paginated<UserResponse>>;
  addUsers(payload: UserRequest): Promise<UserResponse>;
  updateUser(payload: UserRequest): Promise<UserResponse>;
  getUserById(id: string): Promise<UserResponse>;
  deleteUser(id: string): Promise<string>;
  bulkUploadUsers(file: File): Promise<{ inserted: number; skipped: any[] }>;
}
