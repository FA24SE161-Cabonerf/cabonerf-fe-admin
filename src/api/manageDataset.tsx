import { getHeaders } from "@/constants/headers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { DatasetListResponse, DatasetPaginatedResponse } from "@/types/dataset";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchDatasets = async (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): Promise<DatasetPaginatedResponse> => {
  try {
    const params = new URLSearchParams({
      pageCurrent: pageCurrent.toString(),
      pageSize: pageSize.toString(),
    });
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/datasets/admin?${params.toString()}`,
      { headers: getHeaders(), }
    );

    const data: DatasetListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchDatasets:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch datasets: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching datasets"
      );
    }
  }
};

export const useDatasets = (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): UseQueryResult<DatasetPaginatedResponse, Error> => {
  return useQuery<DatasetPaginatedResponse, Error>({
    queryKey: ["datasets", pageCurrent, pageSize, keyword],
    queryFn: () => fetchDatasets(pageCurrent, pageSize, keyword),
  });
};