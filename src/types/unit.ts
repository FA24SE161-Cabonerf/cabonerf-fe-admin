export type UnitGroup = {
  id: number;
  name: string;
  unitGroupType: string;
}

export type Unit = {
  id: number;
  name: string;
  conversionFactor: number;
  unitGroup: UnitGroup;
  default: boolean;
}

export type PaginatedResponse = {
  currentPage: number;
  totalPage: number;
  listResult: Unit[];
}

export type ApiResponse = {
  status: string;
  message: string;
  data: PaginatedResponse;
}