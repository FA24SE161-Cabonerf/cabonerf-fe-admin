import { headers } from "@/constants/headers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { OrganizationListResponse, OrganizationPaginatedResponse } from "@/types/organization";


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchOrganizations = async (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): Promise<OrganizationPaginatedResponse> => {
  try {
    const params = new URLSearchParams({
      pageCurrent: pageCurrent.toString(),
      pageSize: pageSize.toString(),
    });
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/organizations/manager?${params.toString()}`,
      { headers }
    );

    const data: OrganizationListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchOrganizations:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch organizations: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching organizations");
    }
  }
};

export const useOrganizations = (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): UseQueryResult<OrganizationPaginatedResponse, Error> => {
  return useQuery<OrganizationPaginatedResponse, Error>({
    queryKey: ["organizations", pageCurrent, pageSize, keyword],
    queryFn: () => fetchOrganizations(pageCurrent, pageSize, keyword),
  });
};