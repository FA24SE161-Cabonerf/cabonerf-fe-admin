export type EmissionCompartment = {
  id: string;
  name: string;
  description: string;
};

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type EmissionCompartmentListResponse = ApiResponse<EmissionCompartment[]>;
export type EmissionCompartmentResponse = ApiResponse<EmissionCompartment>;