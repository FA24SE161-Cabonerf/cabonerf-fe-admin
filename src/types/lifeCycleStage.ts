export type LifeCycleStage = {
  id: number;
  name: string;
  description: string;
}

export type ApiResponse = {
  status: string;
  message: string;
  data: LifeCycleStage[];
}