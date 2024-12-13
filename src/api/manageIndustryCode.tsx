import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { IndustryCode, IndustryCodeListResponse, IndustryCodePaginatedResponse, IndustryCodeResponse } from "@/types/industryCode";
import { headers } from "@/constants/headers";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchIndustryCodes = async (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): Promise<IndustryCodePaginatedResponse> => {
  try {
    const params = new URLSearchParams({
      pageCurrent: pageCurrent.toString(),
      pageSize: pageSize.toString(),
    });
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/manager/industry-code?${params.toString()}`,
      { headers }
    );

    const data: IndustryCodeListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchIndustryCodes:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch industry codes: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching industry codes"
      );
    }
  }
};

const searchIndustryCode = async (keyword: string): Promise<IndustryCode[]> => {
  try {

    const params = new URLSearchParams();
    if (keyword && keyword.trim() !== '') {
      params.append("keyword", keyword);
    }

    const response = await fetch(
    `${VITE_BASE_URL}/manager/industry-code/get-create${params.toString() ? `?${params.toString()}` : ''}`,
      { headers }
    );

    const data: ApiResponse<IndustryCode[]> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in searchIndustryCode:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to search industry codes: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while searching industry codes"
      );
    }
  }
};


const createIndustryCode = async (data: { code: string; name: string }): Promise<IndustryCode> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/manager/industry-code`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData: IndustryCodeResponse = await response.json();
    return handleApiResponse(response, responseData);
  } catch (error) {
    console.error("Error in createIndustryCode:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create industry code: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the industry code");
    }
  }
};
const updateIndustryCode = async (id: string, data: { code: string; name: string }): Promise<IndustryCode> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/manager/industry-code/${id}`, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData: IndustryCodeResponse = await response.json();
    return handleApiResponse(response, responseData);
  } catch (error) {
    console.error("Error in updateIndustryCode:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update industry code: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the industry code");
    }
  }
};

const deleteIndustryCode = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/manager/industry-code/${id}`, {
      method: 'DELETE',
      headers,
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteIndustryCode:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete industry code: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the industry code");
    }
  }
};


export const useCreateIndustryCode = (): UseMutationResult<
  IndustryCode,
  Error,
  { code: string; name: string },
  unknown
> => {
  return useMutation<IndustryCode, Error, { code: string; name: string }>({
    mutationFn: createIndustryCode,
  });
};

export const useUpdateIndustryCode = (): UseMutationResult<
  IndustryCode,
  Error,
  { id: string; code: string; name: string },
  unknown
> => {
  return useMutation<IndustryCode, Error, { id: string; code: string; name: string }>({
    mutationFn: ({ id, ...data }) => updateIndustryCode(id, data),
  });
};

export const useDeleteIndustryCode = (): UseMutationResult<void, Error, string, unknown> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteIndustryCode,
  });
};

export const useIndustryCodes = (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): UseQueryResult<IndustryCodePaginatedResponse, Error> => {
  return useQuery<IndustryCodePaginatedResponse, Error>({
    queryKey: ["industryCodes", pageCurrent, pageSize, keyword],
    queryFn: () => fetchIndustryCodes(pageCurrent, pageSize, keyword),
  });
};

export const useSearchIndustryCode = (
  keyword: string
): UseQueryResult<IndustryCode[], Error> => {
  return useQuery<IndustryCode[], Error>({
    queryKey: ["searchIndustryCode", keyword],
    queryFn: () => searchIndustryCode(keyword),
  });
};

