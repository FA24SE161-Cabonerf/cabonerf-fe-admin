import { getHeaders } from "@/constants/headers";
import { UnitListResponse, UnitResponse, Unit } from "@/types/unit";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUnits = async (): Promise<Unit[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units`, {  headers: getHeaders(), });

    const data: UnitListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchAllUnits:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch all units: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching all units");
    }
  }
};

const fetchUnitsByUnitGroup = async (unitGroupId: string): Promise<Unit[]> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/unit-groups/${unitGroupId}/units`,
      {  headers: getHeaders(), }
    );

    const data: UnitListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUnitsByUnitGroup:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch units for unit group: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching units for unit group"
      );
    }
  }
};

const fetchUnit = async (id: string): Promise<Unit> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units/${id}`, {
      headers: getHeaders(),
    });

    const data: UnitResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUnit:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch unit: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching the unit");
    }
  }
};

const createUnit = async (unitGroupId: string, unitData: {
  unitName: string;
  conversionFactor: number;
  isDefault: boolean;
}): Promise<Unit> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${unitGroupId}/units`, {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unitData),
    });

    const data: ApiResponse<Unit> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createUnit:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create unit: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the unit");
    }
  }
};

export const useCreateUnit = (): UseMutationResult<
  Unit,
  Error,
  { unitGroupId: string; unitName: string; conversionFactor: number; isDefault: boolean }
> => {
  return useMutation<
    Unit,
    Error,
    { unitGroupId: string; unitName: string; conversionFactor: number; isDefault: boolean }
  >({
    mutationFn: ({ unitGroupId, ...unitData }) => createUnit(unitGroupId, unitData),
  });
};




const updateUnit = async (
  id: string,
  updatedUnit: {
    unitName: string;
    conversionFactor: number;
    isDefault: boolean;
    unitGroupId: string;
  }
): Promise<Unit> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units/${id}`, {
      method: "PUT",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUnit),
    });

    const data: UnitResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateUnit:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update unit: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the unit");
    }
  }
};

const deleteUnit = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteUnit:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete unit: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the unit");
    }
  }
};

export const useUpdateUnit = (): UseMutationResult<
  Unit,
  Error,
  { id: string; unitName: string; conversionFactor: number; isDefault: boolean; unitGroupId: string }
> => {
  return useMutation<
    Unit,
    Error,
    { id: string; unitName: string; conversionFactor: number; isDefault: boolean; unitGroupId: string }
  >({
    mutationFn: ({ id, ...data }) => updateUnit(id, data),
  });
};

export const useDeleteUnit = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteUnit,
  });
};



export const useUnits = (): UseQueryResult<Unit[], Error> => {
  return useQuery<Unit[], Error>({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });
};

export const useUnitsByUnitGroup = (
  unitGroupId: string
): UseQueryResult<Unit[], Error> => {
  return useQuery<Unit[], Error>({
    queryKey: ["units", unitGroupId],
    queryFn: () => fetchUnitsByUnitGroup(unitGroupId),
    enabled: !!unitGroupId,
  });
};

export const useUnit = (id: string): UseQueryResult<Unit, Error> => {
  return useQuery<Unit, Error>({
    queryKey: ["unit", id],
    queryFn: () => fetchUnit(id),
    enabled: !!id,
  });
};
