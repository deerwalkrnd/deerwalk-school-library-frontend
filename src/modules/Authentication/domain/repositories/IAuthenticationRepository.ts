import { loginResponse } from "../entities/loginResponse";
import { User } from "../entities/userEntity";

export default interface IAuthenticationRepository {
  login(): Promise<loginResponse>;
  getUser(): Promise<User>;
}
