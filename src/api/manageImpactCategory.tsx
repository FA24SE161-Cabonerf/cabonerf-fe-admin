import { headers } from "@/constants/headers";
import { ImpactCategory, ImpactCategoryListResponse } from "@/types/impactCategory";
import { useQuery } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchImpactCategories = async (): Promise<ImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories`, {
      headers
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: ImpactCategoryListResponse = await response.json();

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

const fetchImpactCategoriesByMethod = async (methodId: string): Promise<ImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${methodId}/impact-categories`, {
      headers
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: ImpactCategoryListResponse = await response.json();

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

export const useImpactCategories = () => {
  return useQuery<ImpactCategory[], ApiError>({
    queryKey: ["impactCategories"],
    queryFn: fetchImpactCategories,
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

export const useImpactCategoriesByMethod = (methodId: string) => {
  return useQuery<ImpactCategory[], ApiError>({
    queryKey: ["impactCategories", methodId],
    queryFn: () => fetchImpactCategoriesByMethod(methodId),
    enabled: !!methodId,
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