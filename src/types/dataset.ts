import { ApiResponse } from "./apiResponse";
import { EmissionCompartment } from "./emissionCompartment";
import { ImpactMethod } from "./impactMethod";
import { MidpointImpactCategory } from "./midpointImpactCategory";

export interface Dataset {
  id: string;
  name: string;
  systemBoundary: SystemBoundary;
  impacts: Impact[];
}

export interface SystemBoundary {
  boundaryFrom: string;
  boundaryTo: string;
  description: string;
}

export interface Impact {
  id: string;
  unitLevel: number;
  systemLevel: number;
  overallImpactContribution: number;
  method: ImpactMethod;
  impactCategory: ImpactCategory;
}

export interface ImpactCategory {
  id: string;
  name: string;
  iconUrl: string;
  midpointImpactCategory: MidpointImpactCategory;
  emissionCompartment: EmissionCompartment | null;
}

export interface DatasetPaginatedResponse {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  data: Dataset[];
}

export type DatasetListResponse = ApiResponse<DatasetPaginatedResponse>;
export type DatasetResponse = ApiResponse<Dataset>;