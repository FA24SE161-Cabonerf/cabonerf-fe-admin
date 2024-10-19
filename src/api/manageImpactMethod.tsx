import { ApiResponse, ImpactMethod } from "@/types/impactMethod";
import { useQuery } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchImpactMethods = async (): Promise<ImpactMethod[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: ApiResponse<ImpactMethod[]> = await response.json();

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

const fetchImpactMethod = async (id: number): Promise<ImpactMethod> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${id}`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: ApiResponse<ImpactMethod> = await response.json();

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

export const useImpactMethods = () => {
  return useQuery<ImpactMethod[], ApiError>({
    queryKey: ["impactMethods"],
    queryFn: fetchImpactMethods,
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

export const useImpactMethod = (id: number) => {
  return useQuery<ImpactMethod, ApiError>({
    queryKey: ["impactMethod", id],
    queryFn: () => fetchImpactMethod(id),
    enabled: !!id,
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