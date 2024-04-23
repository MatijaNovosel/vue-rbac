import { IUserAccount } from "@/models/user";

export interface IAuthService {
  signIn(username: string): Promise<IUserAccount>;
  signOut(): Promise<void>;
}
