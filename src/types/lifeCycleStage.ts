import { ApiResponse } from "./apiResponse";

export type LifeCycleStage = {
  id: string;
  name: string;
  description: string;
}


export type LifeCycleStageListResponse = ApiResponse<LifeCycleStage[]>;
export type LifeCycleStageResponse = ApiResponse<LifeCycleStage>;