import { ApiResponse } from "./apiResponse";

export type User = {
  id: string;
  fullName: string;
  email: string;
  profilePictureUrl: string;
};

export type Role = {
  id: string;
  name: string;
};

export type Member = {
  id: string;
  user: User;
  role: Role;
  hasJoined: boolean;
};

export type MemberListResponse = ApiResponse<Member[]>;
export type MemberResponse = ApiResponse<Member>;

