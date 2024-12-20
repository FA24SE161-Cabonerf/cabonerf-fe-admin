import { getHeaders } from "@/constants/headers";
import {
  MidpointImpactCategory,
  MidpointImpactCategoryListResponse,
  MidpointImpactCategoryResponse,
} from "@/types/midpointImpactCategory";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchMidpointImpactCategories = async (): Promise<MidpointImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/midpoint-categories`, {
      headers: getHeaders(),
    });

    const data: MidpointImpactCategoryListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchMidpointImpactCategories:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch midpoint impact categories: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching midpoint impact categories");
    }
  }
};

const fetchMidpointImpactCategory = async (id: string): Promise<MidpointImpactCategory> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/midpoint-categories/${id}`, {
      headers: getHeaders(),
    });

    const data: MidpointImpactCategoryResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchMidpointImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch midpoint impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching the midpoint impact category");
    }
  }
};

const createMidpointImpactCategory = async (newCategory: {
  name: string;
  description: string;
  abbr: string;
  unitId: string;
}): Promise<MidpointImpactCategory> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/midpoint-categories`, {
      method: "POST",
      headers: { ...getHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    const data: MidpointImpactCategoryResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createMidpointImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create midpoint impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the midpoint impact category");
    }
  }
};

const updateMidpointImpactCategory = async (
  id: string,
  updatedCategory: {
    name: string;
    description: string;
    abbr: string;
    unitId: string;
  }
): Promise<MidpointImpactCategory> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/midpoint-categories/${id}`, {
      method: "PUT",
      headers: { ...getHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(updatedCategory),
    });

    const data: MidpointImpactCategoryResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateMidpointImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update midpoint impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the midpoint impact category");
    }
  }
};

const deleteMidpointImpactCategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/midpoint-categories/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteMidpointImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete midpoint impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the midpoint impact category");
    }
  }
};

export const useCreateMidpointImpactCategory = (): UseMutationResult<
  MidpointImpactCategory,
  Error,
  { name: string; description: string; abbr: string; unitId: string }
> => {
  return useMutation<
    MidpointImpactCategory,
    Error,
    { name: string; description: string; abbr: string; unitId: string }
  >({
    mutationFn: createMidpointImpactCategory,
  });
};

export const useUpdateMidpointImpactCategory = (): UseMutationResult<
  MidpointImpactCategory,
  Error,
  { id: string; name: string; description: string; abbr: string; unitId: string }
> => {
  return useMutation<
    MidpointImpactCategory,
    Error,
    { id: string; name: string; description: string; abbr: string; unitId: string }
  >({
    mutationFn: ({ id, ...data }) => updateMidpointImpactCategory(id, data),
  });
};

export const useDeleteMidpointImpactCategory = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteMidpointImpactCategory,
  });
};

export const useMidpointImpactCategories = (): UseQueryResult<MidpointImpactCategory[], Error> => {
  return useQuery<MidpointImpactCategory[], Error>({
    queryKey: ["midpointImpactCategories"],
    queryFn: fetchMidpointImpactCategories,
  });
};

export const useMidpointImpactCategory = (id: string): UseQueryResult<MidpointImpactCategory, Error> => {
  return useQuery<MidpointImpactCategory, Error>({
    queryKey: ["midpointImpactCategory", id],
    queryFn: () => fetchMidpointImpactCategory(id),
    enabled: !!id,
  });
};