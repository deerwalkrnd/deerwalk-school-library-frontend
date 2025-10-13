import { loginResponse } from "../entities/loginResponse";
import { User, UserRequest } from "../entities/userEntity";

export default interface IAuthenticationRepository {
  login(credentials: UserRequest): Promise<loginResponse>;
  loginWithSSO(provider: string): Promise<loginResponse>;
  handleGoogleCallback(code: string): Promise<loginResponse>;
  getUser(): Promise<User>;
}
