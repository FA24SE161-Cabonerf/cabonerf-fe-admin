import { ApiResponse } from "./apiResponse";
import { UnitGroup } from "./unitGroup";

export type Unit = {
  id: string;
  name: string;
  conversionFactor: number;
  unitGroup: UnitGroup;
  default: boolean;
};

export type UnitListResponse = ApiResponse<Unit[]>;
export type UnitResponse = ApiResponse<Unit>;
