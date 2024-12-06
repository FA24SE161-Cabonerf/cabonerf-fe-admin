import { ApiResponse } from "./apiResponse";

export type IndustryCode = {
  id: string;
  code: string;
  name: string;
};

export type IndustryCodePaginatedResponse = {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  industryCodes: IndustryCode[];
};

export type IndustryCodeListResponse = ApiResponse<IndustryCodePaginatedResponse>;
export type IndustryCodeResponse = ApiResponse<IndustryCode>;

