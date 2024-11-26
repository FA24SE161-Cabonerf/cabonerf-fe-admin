import { ApiResponse } from "./apiResponse";

export type Contract = {
  id: string;
  url: string;
}



export type ContractListResponse = ApiResponse<Contract[]>;
export type ContractResponse = ApiResponse<Contract>;