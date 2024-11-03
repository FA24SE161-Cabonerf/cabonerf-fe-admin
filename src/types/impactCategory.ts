import { ApiResponse } from "./apiResponse";
import { EmissionCompartment } from "./emissionCompartment";
import { MidpointImpactCategory } from "./midpointImpactCategory";

export type CreateImpactCategoryRequest = {
  name: string;
  indicator: string;
  indicatorDescription: string;
  unit: string;
  midpointImpactCategoryId: string;
  emissionCompartmentId: string;
};

export type ImpactCategory = {
  id: string;
  name: string;
  indicator: string;
  iconUrl: string;
  indicatorDescription: string;
  unit: string;
  midpointImpactCategory: MidpointImpactCategory;
  emissionCompartment: EmissionCompartment;
}

export type ImpactCategoryResponse = ApiResponse<ImpactCategory>;
export type ImpactCategoryListResponse = ApiResponse<ImpactCategory[]>;