import { ApiResponse } from "./apiResponse";
import { Perspective } from "./perspective";

export type ImpactMethod = {
  id: string;
  name: string;
  description: string;
  version: string;
  reference: string;
  perspective: Perspective;
}
export interface ImpactMethodName {
  name: string;
}

export type ImpactMethodListResponse = ApiResponse<ImpactMethod[]>;
export type ImpactMethodResponse = ApiResponse<ImpactMethod>;
export type ImpactMethodNameListResponse = ApiResponse<ImpactMethodName[]>;