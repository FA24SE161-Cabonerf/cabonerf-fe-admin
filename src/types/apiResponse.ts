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
