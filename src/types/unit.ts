import { UnitGroup } from "./unitGroup";

export type Unit = {
  id: string;
  name: string;
  conversionFactor: number;
  unitGroup: UnitGroup;
  default: boolean;
}

export type ApiResponse = {
  status: string;
  message: string;
  data: Unit[];
}

export type UnitListResponse = ApiResponse;
export type UnitResponse = {
  status: string;
  message: string;
  data: Unit;
}