import { getHeaders } from "@/constants/headers";
import { CreateImpactCategoryRequest, ImpactCategory, ImpactCategoryListResponse, ImpactCategoryResponse } from "@/types/impactCategory";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";
import { ImpactMethod, ImpactMethodListResponse } from "@/types/impactMethod";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;



const fetchImpactCategories = async (): Promise<ImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories`, {
      headers: getHeaders(),
    });

    const data: ImpactCategoryListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchImpactCategories:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch impact categories: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching impact categories");
    }
  }
};

const fetchImpactCategoriesByMethod = async (methodId: string): Promise<ImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${methodId}/impact-categories`, {
      headers: getHeaders(),
    });

    const data: ImpactCategoryListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchImpactCategoriesByMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch impact categories for method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching impact categories for method");
    }
  }
};

const fetchImpactCategory = async (id: string): Promise<ImpactCategory> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories/${id}`, {
      headers: getHeaders(),
    });

    const data: ImpactCategoryResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching the impact category");
    }
  }
};

const createImpactCategory = async (newImpactCategory: CreateImpactCategoryRequest): Promise<ImpactCategory> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories`, {
      method: "POST",
      headers: { ...getHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(newImpactCategory),
    });

    const data: ImpactCategoryResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the impact category");
    }
  }
};

const updateImpactCategory = async (
  id: string,
  updatedImpactCategory: CreateImpactCategoryRequest
): Promise<ImpactCategory> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories/${id}`, {
      method: "PUT",
      headers: { ...getHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(updatedImpactCategory),
    });

    const data: ImpactCategoryResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the impact category");
    }
  }
};

const deleteImpactCategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteImpactCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete impact category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the impact category");
    }
  }
};

const fetchImpactMethodsByCategory = async (categoryId: string): Promise<ImpactMethod[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories/${categoryId}/impact-methods`, {
      headers: getHeaders(),
    });

    const data: ImpactMethodListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchImpactMethodsByCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch impact methods for category: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching impact methods for category");
    }
  }
};

const addImpactCategoryToMethod = async (methodId: string, categoryId: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-methods/${methodId}/impact-categories/${categoryId}`, {
      method: "POST",
      headers: getHeaders(),
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in addImpactCategoryToMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to add impact category to method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while adding the impact category to the method");
    }
  }
};

const removeImpactCategoryFromMethod = async (categoryId: string, methodId: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories/${categoryId}/impact-methods/${methodId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in removeImpactCategoryFromMethod:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to remove impact category from method: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while removing the impact category from the method");
    }
  }
};

export const useAddImpactCategoryToMethod = (): UseMutationResult<void, Error, { methodId: string; categoryId: string }> => {
  return useMutation<void, Error, { methodId: string; categoryId: string }>({
    mutationFn: ({ methodId, categoryId }) => addImpactCategoryToMethod(methodId, categoryId),
  });
};

export const useRemoveImpactCategoryFromMethod = (): UseMutationResult<void, Error, { categoryId: string; methodId: string }> => {
  return useMutation<void, Error, { categoryId: string; methodId: string }>({
    mutationFn: ({ categoryId, methodId }) => removeImpactCategoryFromMethod(categoryId, methodId),
  });
};

export const useImpactMethodsByCategory = (categoryId: string): UseQueryResult<ImpactMethod[], Error> => {
  return useQuery<ImpactMethod[], Error>({
    queryKey: ["impactMethods", categoryId],
    queryFn: () => fetchImpactMethodsByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useCreateImpactCategory = (): UseMutationResult<
  ImpactCategory,
  Error,
  CreateImpactCategoryRequest
> => {
  return useMutation<ImpactCategory, Error, CreateImpactCategoryRequest>({
    mutationFn: createImpactCategory,
  });
};

export const useUpdateImpactCategory = (): UseMutationResult<
  ImpactCategory,
  Error,
  { id: string; name: string; indicator: string; indicatorDescription: string; unit: string; midpointImpactCategoryId: string; emissionCompartmentId: string }
> => {
  return useMutation<
    ImpactCategory,
    Error,
    { id: string; name: string; indicator: string; indicatorDescription: string; unit: string; midpointImpactCategoryId: string; emissionCompartmentId: string }
  >({
    mutationFn: ({ id, ...data }) => updateImpactCategory(id, data),
  });
};

export const useDeleteImpactCategory = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteImpactCategory,
  });
};



export const useImpactCategories = (): UseQueryResult<ImpactCategory[], Error> => {
  return useQuery<ImpactCategory[], Error>({
    queryKey: ["impactCategories"],
    queryFn: fetchImpactCategories,
  });
};

export const useImpactCategoriesByMethod = (methodId: string): UseQueryResult<ImpactCategory[], Error> => {
  return useQuery<ImpactCategory[], Error>({
    queryKey: ["impactCategories", methodId],
    queryFn: () => fetchImpactCategoriesByMethod(methodId),
    enabled: !!methodId,
  });
};

export const useImpactCategory = (id: string): UseQueryResult<ImpactCategory, Error> => {
  return useQuery<ImpactCategory, Error>({
    queryKey: ["impactCategory", id],
    queryFn: () => fetchImpactCategory(id),
    enabled: !!id,
  });
};