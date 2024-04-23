import { ADMIN_USER, DEV_USER } from "@/constants/user";
import { IUserAccount } from "@/models/user";
import { IAuthService } from "../interfaces/auth";

export class AuthService implements IAuthService {
  async signOut(): Promise<void> {
    //
  }

  async signIn(username: string): Promise<IUserAccount> {
    if (username === "admin") {
      return ADMIN_USER;
    } else {
      return DEV_USER;
    }
  }
}
