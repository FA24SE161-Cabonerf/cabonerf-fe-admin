export type LifeCycleStage = {
  id: string;
  name: string;
  description: string;
}

export type ApiResponse = {
  status: string;
  message: string;
  data: LifeCycleStage[];
}