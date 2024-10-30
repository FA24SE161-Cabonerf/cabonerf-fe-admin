import { ApiResponse } from "./apiResponse";

export type EmissionCompartment = {
  id: string;
  name: string;
  description: string;
};



export type EmissionCompartmentListResponse = ApiResponse<EmissionCompartment[]>;
export type EmissionCompartmentResponse = ApiResponse<EmissionCompartment>;