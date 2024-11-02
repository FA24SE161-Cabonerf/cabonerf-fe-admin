import { headers } from "@/constants/headers";
import { ImpactCategory, ImpactCategoryListResponse, ImpactCategoryResponse } from "@/types/impactCategory";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchImpactCategories = async (): Promise<ImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/impact-categories`, {
      headers
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
      headers
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
      headers
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