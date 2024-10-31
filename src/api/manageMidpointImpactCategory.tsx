import { headers } from "@/constants/headers";
import {
  MidpointImpactCategory,
  MidpointImpactCategoryListResponse,
  MidpointImpactCategoryResponse,
} from "@/types/midpointImpactCategory";
import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchMidpointImpactCategories = async (): Promise<MidpointImpactCategory[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/midpoint-categories`, {
      headers,
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
    const response = await fetch(`${VITE_BASE_URL}/api/v1/impacts/midpoint-categories/${id}`, {
      headers,
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