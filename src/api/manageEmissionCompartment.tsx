import { headers } from "@/constants/headers";
import {
  EmissionCompartment,
  EmissionCompartmentListResponse,
  EmissionCompartmentResponse,
} from "@/types/emissionCompartment";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

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
const createEmissionCompartment = async (newEmissionCompartment: {
  name: string;
  description: string;
}): Promise<EmissionCompartment> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/emissions/emission-compartments`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmissionCompartment),
    });

    const data: EmissionCompartmentResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createEmissionCompartment:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create emission compartment: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the emission compartment");
    }
  }
};

const updateEmissionCompartment = async (
  id: string,
  updatedEmissionCompartment: {
    name: string;
    description: string;
  }
): Promise<EmissionCompartment> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/emissions/emission-compartments/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmissionCompartment),
    });

    const data: EmissionCompartmentResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateEmissionCompartment:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update emission compartment: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the emission compartment");
    }
  }
};

const deleteEmissionCompartment = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/emissions/emission-compartments/${id}`, {
      method: "DELETE",
      headers,
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteEmissionCompartment:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete emission compartment: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the emission compartment");
    }
  }
};

export const useCreateEmissionCompartment = (): UseMutationResult<
  EmissionCompartment,
  Error,
  { name: string; description: string }
> => {
  return useMutation<
    EmissionCompartment,
    Error,
    { name: string; description: string }
  >({
    mutationFn: createEmissionCompartment,
  });
};

export const useUpdateEmissionCompartment = (): UseMutationResult<
  EmissionCompartment,
  Error,
  { id: string; name: string; description: string }
> => {
  return useMutation<
    EmissionCompartment,
    Error,
    { id: string; name: string; description: string }
  >({
    mutationFn: ({ id, ...data }) => updateEmissionCompartment(id, data),
  });
};

export const useDeleteEmissionCompartment = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteEmissionCompartment,
  });
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
