import { headers } from "@/constants/headers";
import {
  Perspective,
  PerspectiveListResponse,
  PerspectiveResponse,
} from "@/types/perspective";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchPerspectives = async (): Promise<Perspective[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives/`, {
      headers,
    });

    const data: PerspectiveListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchPerspectives:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch perspectives: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching perspectives");
    }
  }
};

const createPerspective = async (newPerspective: {
  name: string;
  description?: string | null;
  abbr?: string | null;
}): Promise<Perspective> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerspective),
    });

    const data: PerspectiveResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createPerspective:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create perspective: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the perspective");
    }
  }
};

const updatePerspective = async (
  id: string,
  updatedPerspective: {
    name: string;
    description?: string | null;
    abbr?: string | null;
  }
): Promise<Perspective> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerspective),
    });

    const data: PerspectiveResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updatePerspective:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update perspective: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the perspective");
    }
  }
};

const deletePerspective = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives/${id}`, {
      method: "DELETE",
      headers,
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deletePerspective:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete perspective: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the perspective");
    }
  }
};

export const useCreatePerspective = (): UseMutationResult<
  Perspective,
  Error,
  { name: string; description?: string | null; abbr?: string | null }
> => {
  return useMutation<
    Perspective,
    Error,
    { name: string; description?: string | null; abbr?: string | null }
  >({
    mutationFn: createPerspective,
  });
};

export const useUpdatePerspective = (): UseMutationResult<
  Perspective,
  Error,
  { id: string; name: string; description?: string | null; abbr?: string | null }
> => {
  return useMutation<
    Perspective,
    Error,
    { id: string; name: string; description?: string | null; abbr?: string | null }
  >({
    mutationFn: ({ id, ...data }) => updatePerspective(id, data),
  });
};

export const useDeletePerspective = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deletePerspective,
  });
};

export const usePerspectives = (): UseQueryResult<Perspective[], Error> => {
  return useQuery<Perspective[], Error>({
    queryKey: ["perspectives"],
    queryFn: fetchPerspectives,
  });
};