import { headers } from "@/constants/headers";
import { ApiResponse, PaginatedResponse } from "@/types/apiResponse";
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

const downloadMidpointFactorTemplate = async (): Promise<Blob> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/impacts/admin/midpoint-factors/factor-template`,
      {
        headers,
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error in downloadMidpointFactorTemplate:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to download midpoint factor template: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while downloading the midpoint factor template");
    }
  }
};

interface ExportMidpointFactorsParams {
  methodId: string;
  impactCategoryId: string;
}

const exportMidpointFactors = async (params: ExportMidpointFactorsParams): Promise<Blob> => {
  try {
    const queryParams = new URLSearchParams({
      methodId: params.methodId,
      impactCategoryId: params.impactCategoryId,
    });

    const response = await fetch(
      `${VITE_BASE_URL}/impacts/admin/midpoint-factors/export?${queryParams.toString()}`,
      {
        headers,
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error in exportMidpointFactors:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to export midpoint factors: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while exporting midpoint factors");
    }
  }
};

type ImportMidpointFactorsResponseData = {
  importData: MidpointSubstance[];
  filePath: string | null;
};

type ImportMidpointFactorsResponse = ApiResponse<ImportMidpointFactorsResponseData>;

const importMidpointFactors = async (methodName: string, file: File): Promise<ImportMidpointFactorsResponseData> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${VITE_BASE_URL}/impacts/admin/midpoint-factors/import?methodName=${encodeURIComponent(methodName)}`,
      {
        method: 'POST',
        headers: {
          ...headers,
        },
        body: formData,
      }
    );

    const data: ImportMidpointFactorsResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in importMidpointFactors:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to import midpoint factors: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while importing midpoint factors");
    }
  }
};


const downloadErrorLog = async (fileName: string): Promise<Blob> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/impacts/admin/midpoint-factors/download?fileName=${encodeURIComponent(fileName)}`,
      {
        headers,
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error in downloadErrorLog:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to download error log: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while downloading the error log");
    }
  }
};

export const useImportMidpointFactors = (): UseMutationResult<ImportMidpointFactorsResponseData, Error, { methodName: string, file: File }> => {
  return useMutation<ImportMidpointFactorsResponseData, Error, { methodName: string, file: File }>({
    mutationFn: ({ methodName, file }) => importMidpointFactors(methodName, file),
  });
};

export const useDownloadErrorLog = (): UseMutationResult<Blob, Error, string> => {
  return useMutation<Blob, Error, string>({
    mutationFn: downloadErrorLog,
  });
};

export const useExportMidpointFactors = (): UseMutationResult<Blob, Error, ExportMidpointFactorsParams> => {
  return useMutation<Blob, Error, ExportMidpointFactorsParams>({
    mutationFn: exportMidpointFactors,
  });
};

export const useDownloadMidpointFactorTemplate = (): UseQueryResult<Blob, Error> => {
  return useQuery<Blob, Error>({
    queryKey: ["midpointFactorTemplate"],
    queryFn: downloadMidpointFactorTemplate,
    enabled: false, // This query will not run automatically
  });
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
