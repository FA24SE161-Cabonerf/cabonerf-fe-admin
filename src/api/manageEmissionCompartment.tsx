import { headers } from "@/constants/headers";
import {
  EmissionCompartment,
  EmissionCompartmentListResponse,
} from "@/types/emissionCompartment";
import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchEmissionCompartments = async (): Promise<EmissionCompartment[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/emissions/emission-compartments`, {
      headers,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: EmissionCompartmentListResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(500, `Unexpected error: ${error.message}`);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

export const useEmissionCompartments = (): UseQueryResult<EmissionCompartment[], ApiError> => {
  return useQuery<EmissionCompartment[], ApiError>({
    queryKey: ["emissionCompartments"],
    queryFn: fetchEmissionCompartments,
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