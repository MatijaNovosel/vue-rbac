import { TokenModel } from "@/models/user";

export interface IAuthService {
  signInWithEmailAndPassword(email: string, password: string): Promise<TokenModel>;
  deleteAccount(): Promise<void>;
  signOut(): Promise<void>;
}
