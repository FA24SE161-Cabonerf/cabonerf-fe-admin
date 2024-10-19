export type Perspective = {
  id: number;
  name: string;
  description: string;
  abbr: string;
}

export type ImpactMethod = {
  id: number;
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