import { headers } from "@/constants/headers";
import { ImpactMethod, ImpactMethodListResponse, ImpactMethodResponse } from "@/types/impactMethod";
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchImpactMethods = async (): Promise<ImpactMethod[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods`, {
      headers
    });

    const data: ImpactMethodListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchImpactMethods:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch impact methods: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching impact methods");
    }
  }
};

const fetchImpactMethod = async (id: string): Promise<ImpactMethod> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${id}`, {
      headers
    });

    const data: ImpactMethodResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchImpactMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch impact method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching the impact method");
    }
  }
};

const createImpactMethod = async (newMethod: {
  name: string;
  description?: string | null;
  version: string;
  reference?: string | null;
  perspectiveId: string;
}): Promise<ImpactMethod> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMethod),
    });

    const data: ImpactMethodResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createImpactMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create impact method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the impact method");
    }
  }
};

const updateImpactMethod = async (
  id: string,
  updatedMethod: {
    name: string;
    description?: string | null;
    version: string;
    reference?: string | null;
    perspectiveId: string;
  }
): Promise<ImpactMethod> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMethod),
    });

    const data: ImpactMethodResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateImpactMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update impact method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the impact method");
    }
  }
};

const deleteImpactMethod = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${id}`, {
      method: "DELETE",
      headers,
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteImpactMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete impact method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the impact method");
    }
  }
};

export const useImpactMethods = (): UseQueryResult<ImpactMethod[], Error> => {
  return useQuery<ImpactMethod[], Error>({
    queryKey: ["impactMethods"],
    queryFn: fetchImpactMethods,
  });
};

export const useImpactMethod = (id: string): UseQueryResult<ImpactMethod, Error> => {
  return useQuery<ImpactMethod, Error>({
    queryKey: ["impactMethod", id],
    queryFn: () => fetchImpactMethod(id),
    enabled: !!id,
  });
};

export const useCreateImpactMethod = (): UseMutationResult<
  ImpactMethod,
  Error,
  {
    name: string;
    description?: string | null;
    version: string;
    reference?: string | null;
    perspectiveId: string;
  }
> => {
  return useMutation<
    ImpactMethod,
    Error,
    {
      name: string;
      description?: string | null;
      version: string;
      reference?: string | null;
      perspectiveId: string;
    }
  >({
    mutationFn: createImpactMethod,
  });
};

export const useUpdateImpactMethod = (): UseMutationResult<
  ImpactMethod,
  Error,
  {
    id: string;
    name: string;
    description?: string | null;
    version: string;
    reference?: string | null;
    perspectiveId: string;
  }
> => {
  return useMutation<
    ImpactMethod,
    Error,
    {
      id: string;
      name: string;
      description?: string | null;
      version: string;
      reference?: string | null;
      perspectiveId: string;
    }
  >({
    mutationFn: ({ id, ...data }) => updateImpactMethod(id, data),
  });
};

export const useDeleteImpactMethod = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteImpactMethod,
  });
};