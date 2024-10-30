import { ApiResponse, PaginatedResponse } from "./apiResponse";

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
};

export type MidpointSubstanceListResponse = ApiResponse<PaginatedResponse<MidpointSubstance>>;
export type MidpointSubstanceResponse = ApiResponse<MidpointSubstance>;