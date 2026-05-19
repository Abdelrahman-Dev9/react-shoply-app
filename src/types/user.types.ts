export type UserStatus = "Active" | "inactive";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  status: UserStatus;
  active?: boolean;
  gender?: string;
  birthday?: string;
}

export interface UsersResponse {
  allUsers: User[];
  usercount: number;
}
