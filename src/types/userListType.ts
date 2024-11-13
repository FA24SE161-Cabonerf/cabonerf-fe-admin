import { ApiResponse } from "./apiResponse";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  profilePictureUrl: string | null;
  bio: string | null;
  status: boolean;
};

export type UserPaginatedResponse = {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  users: User[];
};

export type UserListResponse = ApiResponse<UserPaginatedResponse>;

export type UserResponse = ApiResponse<User>;