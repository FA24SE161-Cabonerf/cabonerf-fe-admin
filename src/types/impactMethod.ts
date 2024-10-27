export type Perspective = {
  id: string;
  name: string;
  description: string;
  abbr: string;
}

export type ImpactMethod = {
  id: string;
  name: string;
  description: string;
  version: string;
  reference: string;
  perspective: Perspective;
}

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
}

export type ImpactMethodListResponse = ApiResponse<ImpactMethod[]>;
export type ImpactMethodResponse = ApiResponse<ImpactMethod>;