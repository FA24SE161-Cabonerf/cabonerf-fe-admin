import { headers } from "@/constants/headers";
import { PaginatedResponse } from "@/types/apiResponse";
import {
  MidpointSubstance,
  MidpointSubstanceListResponse,
} from "@/types/midpointSubstance";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchMidpointSubstances = async (
  page: number,
  pageSize: number,
  compartmentId?: string,
  keyword?: string
): Promise<PaginatedResponse<MidpointSubstance>> => {
  try {
    const params = new URLSearchParams({
      currentPage: page.toString(),
      pageSize: pageSize.toString(),
    });
    if (compartmentId) params.append("compartmentId", compartmentId);
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/impacts/admin/midpoint-factors?${params.toString()}`,
      {
        headers,
      }
    );

    const data: MidpointSubstanceListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchMidpointSubstances:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch midpoint substances: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching midpoint substances");
    }
  }
};

export const useMidpointSubstances = (
  page: number,
  pageSize: number,
  compartmentId?: string,
  keyword?: string
): UseQueryResult<PaginatedResponse<MidpointSubstance>, Error> => {
  return useQuery<PaginatedResponse<MidpointSubstance>, Error>({
    queryKey: ["midpointSubstances", page, pageSize, compartmentId, keyword],
    queryFn: () => fetchMidpointSubstances(page, pageSize, compartmentId, keyword),
  });
};
