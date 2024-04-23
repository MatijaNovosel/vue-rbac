import { TokenModel } from "@/models/user";

export interface IAuthService {
  signInWithEmailAndPassword(email: string, password: string): Promise<TokenModel>;
  signOut(): Promise<void>;
}
