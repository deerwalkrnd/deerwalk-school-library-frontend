import { loginResponse } from "../entities/loginResponse";
import { ForgotPasswordResponse } from "../entities/forgotPasswordResponse";
import { ResetPasswordResponse } from "../entities/resetPasswordResponse";
import { User, UserRequest } from "../entities/userEntity";

export default interface IAuthenticationRepository {
  login(credentials: UserRequest): Promise<loginResponse>;
  loginWithSSO(provider: string): Promise<loginResponse>;
  handleGoogleCallback(code: string): Promise<loginResponse>;
  getUser(): Promise<User>;
  resetPassword(params: { email: string }): Promise<ForgotPasswordResponse>;
  resetPasswordConfirm(params: {
    token: string;
    newPassword: string;
  }): Promise<ResetPasswordResponse>;
}
