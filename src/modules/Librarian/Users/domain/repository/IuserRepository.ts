import { Paginated } from "@/core/lib/Pagination";
import { UserRequest, UserResponse } from "../entities/UserEntity";

export default interface IUserRepository {
  getUsers(params?: any): Promise<Paginated<UserResponse>>;
  // bulkUploadUsers(): Promise<any>;
  addUsers(payload: UserRequest): Promise<UserResponse>;
  updateUser(payload: UserRequest): Promise<UserResponse>;
  getUserById(id: string): Promise<UserResponse>;
  deleteUser(id: string): Promise<string>;
}
