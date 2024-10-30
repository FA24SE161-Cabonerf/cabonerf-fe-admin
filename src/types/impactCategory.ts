import { ApiResponse } from "./apiResponse";

// Unit type
export type Unit = {
  id: string;
  name: string;
  conversionFactor: number;
  unitGroup: {
    id: string;
    name: string;
    unitGroupType: string;
  };
  default: boolean;
}

// MidpointImpactCategory type
export type MidpointImpactCategory = {
  id: string;
  name: string;
  description: string;
  abbr: string;
  unit: Unit;
}

// EmissionCompartment type
export type EmissionCompartment = {
  id: string;
  name: string;
  description: string;
}

// ImpactCategory type
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


// Specific response types
export type ImpactCategoryResponse = ApiResponse<ImpactCategory>;
export type ImpactCategoryListResponse = ApiResponse<ImpactCategory[]>;