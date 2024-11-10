import { headers } from "@/constants/headers";
import {
  EmissionCompartment,
  EmissionCompartmentListResponse,
} from "@/types/emissionCompartment";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchEmissionCompartments = async (): Promise<EmissionCompartment[]> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/emissions/emission-compartments`,
      {
        headers,
      }
    );

    const data: EmissionCompartmentListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchEmissionCompartments:", error);
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch emission compartments: ${error.message}`
      );
    } else {
      throw new Error(
        "An unexpected error occurred while fetching emission compartments"
      );
    }
  }
};

export const useEmissionCompartments = (): UseQueryResult<
  EmissionCompartment[],
  Error
> => {
  return useQuery<EmissionCompartment[], Error>({
    queryKey: ["emissionCompartments"],
    queryFn: fetchEmissionCompartments,
  });
};
