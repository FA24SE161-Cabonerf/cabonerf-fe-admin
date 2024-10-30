import { ApiResponse } from "./apiResponse";

export type UnitGroup = {
  id: string;
  name: string;
  unitGroupType: string;
}



export type UnitGroupListResponse = ApiResponse<UnitGroup[]>;
export type UnitGroupResponse = ApiResponse<UnitGroup>;