import { ApiResponse } from "./apiResponse";

export type Organization = {
  id: string;
  name: string;
  contract: string | null;
}

export type OrganizationPaginatedResponse = {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  list: Organization[];
};

export type OrganizationListResponse = ApiResponse<OrganizationPaginatedResponse>;
export type OrganizationResponse = ApiResponse<Organization>;