export type Perspective = {
  id: string;
  name: string;
  description: string;
  abbr: string;
};

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type PerspectiveListResponse = ApiResponse<Perspective[]>;
export type PerspectiveResponse = ApiResponse<Perspective>;