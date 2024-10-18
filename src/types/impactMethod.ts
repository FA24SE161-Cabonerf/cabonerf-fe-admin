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

export type ApiResponse = {
  status: string;
  message: string;
  data: ImpactMethod[];
}