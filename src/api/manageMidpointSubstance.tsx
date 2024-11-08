import { headers } from "@/constants/headers";
import { PaginatedResponse } from "@/types/apiResponse";
import {
  MidpointSubstance,
  MidpointSubstanceListResponse,
  MidpointSubstanceResponse,
} from "@/types/midpointSubstance";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { EmissionSubstanceListResponse } from "@/types/emissionSubstance";

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

const fetchEmissionSubstances = async (keyword: string): Promise<EmissionSubstanceListResponse> => {
  try {
    const params = new URLSearchParams({
      keyword: keyword,
    });

    const response = await fetch(
      `${VITE_BASE_URL}/emission-substance/admin?${params.toString()}`,
      {
        headers,
      }
    );

    const data: EmissionSubstanceListResponse = await response.json();

    if (data.status !== "Success") {
      throw new Error(data.message || "Failed to fetch emission substances");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchEmissionSubstances:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch emission substances: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching emission substances");
    }
  }
};



export type CreateMidpointSubstanceInput = {
  name: string;
  chemicalName?: string | null;
  molecularFormula?: string | null;
  alternativeFormula?: string | null;
  cas?: string | null;
  value: number;
  emissionCompartmentId: string;
  methodId: string;
  categoryId: string;
  unitId: string;
  substanceCompartmentId?: string;
};

const createMidpointSubstance = async (newMidpointSubstance: CreateMidpointSubstanceInput): Promise<MidpointSubstance> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/admin`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMidpointSubstance),
    });

    const data: MidpointSubstanceResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createMidpointSubstance:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create midpoint substance: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the midpoint substance");
    }
  }
};

const deleteMidpointSubstance = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/admin/midpoint-factors/${id}`, {
      method: "DELETE",
      headers,
    });

    const data: MidpointSubstanceResponse = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteMidpointSubstance:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete midpoint substance: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the midpoint substance");
    }
  }
};

export const useCreateMidpointSubstance = (): UseMutationResult<
  MidpointSubstance,
  Error,
  CreateMidpointSubstanceInput
> => {
  return useMutation<
    MidpointSubstance,
    Error,
    CreateMidpointSubstanceInput
  >({
    mutationFn: createMidpointSubstance,
  });
};
export const useDeleteMidpointSubstance = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteMidpointSubstance,
  });
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

export const useEmissionSubstances = (
  keyword: string
): UseQueryResult<EmissionSubstanceListResponse, Error> => {
  return useQuery<EmissionSubstanceListResponse, Error>({
    queryKey: ["emissionSubstances", keyword],
    queryFn: () => fetchEmissionSubstances(keyword),
    enabled: !!keyword, 
  });
};
