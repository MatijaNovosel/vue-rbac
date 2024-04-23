import { IUserAccount } from "@/models/user";
import { PERMISSIONS } from "./authorization";

export const ADMIN_USER: IUserAccount = {
  id: 1,
  permissions: [PERMISSIONS.CanViewArchive, PERMISSIONS.CanArchivePost, PERMISSIONS.CanDeletePost],
  email: "admin@admin.admin",
  userName: "admin"
};

export const DEV_USER: IUserAccount = {
  id: 2,
  permissions: [PERMISSIONS.CanArchivePost],
  email: "dev@dev.dev",
  userName: "dev"
};
