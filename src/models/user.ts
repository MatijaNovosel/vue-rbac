export interface IUserAccount {
  id: number;
  userName?: string | null;
  email?: string | null;
  permissions: number[];
}
