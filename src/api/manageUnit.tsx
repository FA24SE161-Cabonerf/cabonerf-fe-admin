import { ApiResponse } from "@/types/unit";
import { useQuery } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchUnits = async (
  page: number,
  pageSize: number,
  unitGroupId: number
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/units?currentPage=${page}&pageSize=${pageSize}&unitGroupId=${unitGroupId}`
    );

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: ApiResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(500, `Network error: ${error.message}`);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

export const useUnits = (
  page: number,
  pageSize: number,
  unitGroupId: number
) => {
  return useQuery<ApiResponse, ApiError>({
    queryKey: ["units", page, pageSize, unitGroupId],
    queryFn: () => fetchUnits(page, pageSize, unitGroupId),
    retry: (failureCount, error) => {
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
