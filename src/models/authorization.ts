import { IUserAccount } from "./user";

export type UserRuleDefinitionType = (user: IUserAccount) => boolean;

export interface Rule {
  name: string;
  definition: UserRuleDefinitionType;
}
