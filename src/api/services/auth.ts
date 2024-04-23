import { TokenModel } from "@/models/user";
import { IAuthService } from "../interfaces/auth";

export class AuthService implements IAuthService {
  async signOut(): Promise<void> {
    //
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<TokenModel> {
    return {
      userId: "1",
      expiresAt: 3_600,
      refreshToken: "refreshToken",
      expiresIn: 3_600, // 1h - 3600s
      token: "accessToken"
    };
  }
}
