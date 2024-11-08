export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  currentPage: number;
  totalPage: number;
  listResult: T[];
};

export type PaginatedResponseEmission<T> = {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  list: T[];
};