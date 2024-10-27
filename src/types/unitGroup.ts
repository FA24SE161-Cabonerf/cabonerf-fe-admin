
export type UnitGroup = {
  id: string;
  name: string;
  unitGroupType: string;
}

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
}

export type UnitGroupListResponse = ApiResponse<UnitGroup[]>;
export type UnitGroupResponse = ApiResponse<UnitGroup>;