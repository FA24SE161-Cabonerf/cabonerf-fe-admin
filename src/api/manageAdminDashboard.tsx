import { headers } from "@/constants/headers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUserCount = async (): Promise<number> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/users/admin/count-all-user`,
      { headers }
    );

    const data: ApiResponse<number> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUserCount:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user count: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching user count");
    }
  }
};

const fetchProjectCount = async (): Promise<number> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/projects/admin/count-project`,
      { headers }
    );

    const data: ApiResponse<number> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchProjectCount:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project count: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching project count");
    }
  }
};

export interface MonthlyUserCount {
  month: string;
  userCount: number;
}

const fetchMonthlyNewUsers = async (): Promise<MonthlyUserCount[]> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/users/admin/count-user-new`,
      { headers }
    );

    const data: ApiResponse<MonthlyUserCount[]> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchMonthlyNewUsers:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch monthly new users: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching monthly new users");
    }
  }
};

export interface ImpactData {
  categoryName: string;
  totalValue: number;
}

const fetchSumImpact = async (): Promise<ImpactData[]> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/projects/admin/sum-impact`,
      { headers }
    );

    const data: ApiResponse<ImpactData[]> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchSumImpact:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch sum impact: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching sum impact");
    }
  }
};

export interface EmissionSubstanceCount {
  compartmentName: string;
  count: number;
}

const fetchEmissionSubstanceCount = async (): Promise<EmissionSubstanceCount[]> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/impacts/admin/count-emission-substance`,
      { headers }
    );

    const data: ApiResponse<EmissionSubstanceCount[]> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchEmissionSubstanceCount:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch emission substance count: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching emission substance count");
    }
  }
};

export const useEmissionSubstanceCount = (): UseQueryResult<EmissionSubstanceCount[], Error> => {
  return useQuery<EmissionSubstanceCount[], Error>({
    queryKey: ["emissionSubstanceCount"],
    queryFn: fetchEmissionSubstanceCount,
  });
};

export const useSumImpact = (): UseQueryResult<ImpactData[], Error> => {
  return useQuery<ImpactData[], Error>({
    queryKey: ["sumImpact"],
    queryFn: fetchSumImpact,
  });
};

export const useMonthlyNewUsers = (): UseQueryResult<MonthlyUserCount[], Error> => {
  return useQuery<MonthlyUserCount[], Error>({
    queryKey: ["monthlyNewUsers"],
    queryFn: fetchMonthlyNewUsers,
  });
};

export const useProjectCount = (): UseQueryResult<number, Error> => {
  return useQuery<number, Error>({
    queryKey: ["projectCount"],
    queryFn: fetchProjectCount,
  });
};

export const useUserCount = (): UseQueryResult<number, Error> => {
  return useQuery<number, Error>({
    queryKey: ["userCount"],
    queryFn: fetchUserCount,
  });
};