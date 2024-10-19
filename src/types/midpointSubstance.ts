export type MidpointSubstance = {
  id: string;
  casNumber: string;
  name: string;
  chemicalName: string;
  compartmentName: string;
  molecularFormula: string;
  alternativeFormula: string;
  individualist: number;
  hierarchist: number;
  egalitarian: number;
}

export type PaginatedResponse = {
  currentPage: number;
  totalPage: number;
  listResult: MidpointSubstance[];
}

export type ApiResponse = {
  status: string;
  message: string;
  data: PaginatedResponse;
}