import { headers } from "@/constants/headers";
import { ApiResponse, Unit } from "@/types/unit";
import { useQuery } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchUnits = async (unitGroupId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/units?unitGroupId=${unitGroupId}`,
      { headers }
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

export const useUnits = (unitGroupId: string) => {
  return useQuery<ApiResponse, ApiError>({
    queryKey: ["units", unitGroupId],
    queryFn: () => fetchUnits(unitGroupId),
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

const fetchUnit = async (id: string): Promise<Unit> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units/${id}`, {
      headers,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
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

export const useUnit = (id: string) => {
  return useQuery<Unit, ApiError>({
    queryKey: ["unit", id],
    queryFn: () => fetchUnit(id),
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