import { ApiResponse } from "./apiResponse";

export type Perspective = {
  id: string;
  name: string;
  description: string;
  abbr: string;
};

export type PerspectiveListResponse = ApiResponse<Perspective[]>;
export type PerspectiveResponse = ApiResponse<Perspective>;