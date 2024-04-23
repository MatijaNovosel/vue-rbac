import { UserDataModel } from "@/models/user";
import { IAccountService } from "../interfaces/account";

export class AccountService implements IAccountService {
  async getUserData(userId: string): Promise<UserDataModel> {
    return {
      username: "username"
    };
  }
}
