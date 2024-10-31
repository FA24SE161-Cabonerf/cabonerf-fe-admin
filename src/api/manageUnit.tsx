import { headers } from "@/constants/headers";
import { UnitListResponse, UnitResponse, Unit } from "@/types/unit";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUnits = async (): Promise<Unit[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units`, { headers });

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
      { headers }
    );

    const data: UnitListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUnitsByUnitGroup:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch units for unit group: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching units for unit group");
    }
  }
};

const fetchUnit = async (id: string): Promise<Unit> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/units/${id}`, {
      headers,
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

export const useUnits = (): UseQueryResult<Unit[], Error> => {
  return useQuery<Unit[], Error>({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });
};

export const useUnitsByUnitGroup = (unitGroupId: string): UseQueryResult<Unit[], Error> => {
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