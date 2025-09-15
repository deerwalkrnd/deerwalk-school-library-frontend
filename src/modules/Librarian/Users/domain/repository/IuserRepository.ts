import { UserResponse } from "../entities/UserEntity";

export default interface IUserRepository {
  getUsers(): Promise<UserResponse[]>;
  bulkUploadUsers(): Promise<any>;
  addUsers(): Promise<UserResponse>;
  getUserById(id: string): Promise<UserResponse>;
  deleteUser(id: string): Promise<string>;
  updateUser(id: string): Promise<UserResponse>;
}
