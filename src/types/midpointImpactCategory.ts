import { ApiResponse } from "./apiResponse";
import { Unit } from "./unit";

export interface MidpointImpactCategory {
  id: string;
  name: string;
  description: string;
  abbr: string;
  unit: Unit;
}

export type MidpointImpactCategoryListResponse = ApiResponse<MidpointImpactCategory[]>;
export type MidpointImpactCategoryResponse = ApiResponse<MidpointImpactCategory>;