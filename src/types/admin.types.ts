export type UserStatus = "Active" | "inactive";

export interface Admin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  status?: UserStatus;
}

export interface AdminsResponse {
  allAdmins: Admin[];
}

export interface AdminResponse {
  admin: Admin;
}
