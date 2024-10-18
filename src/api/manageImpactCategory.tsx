import { ApiResponse, ImpactCategory } from "@/types/impactCategory";
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
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories`);

    if (!response.ok) {
      // Handle HTTP errors
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: ApiResponse = await response.json();

    // Check if the API returned an error status
    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data.map((category) => ({
      ...category,
      name: category.name || null,
      indicator: category.indicator || null,
      indicatorDescription: category.indicatorDescription || null,
      unit: category.unit || null,
      midpointImpactCategory: category.midpointImpactCategory || null,
      emissionCompartment: category.emissionCompartment || null,
    }));
  } catch (error) {
    // Handle network errors or errors thrown above
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
