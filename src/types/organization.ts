import { ApiResponse } from "./apiResponse";
import { Contract } from "./contract";
import { IndustryCode } from "./industryCode";

export type Organization = {
  id: string;
  name: string;
  description: string;
  taxCode: string;
  industryCodes : IndustryCode[];
  contract: Contract;
  logo: string;
}

export type OrganizationPaginatedResponse = {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  list: Organization[];
};

export type OrganizationListResponse = ApiResponse<OrganizationPaginatedResponse>;
export type OrganizationResponse = ApiResponse<Organization>;