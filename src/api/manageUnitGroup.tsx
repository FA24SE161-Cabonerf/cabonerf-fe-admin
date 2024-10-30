import { headers } from "@/constants/headers";
import {
  UnitGroup,
  UnitGroupListResponse,
  UnitGroupResponse,
} from "@/types/unitGroup";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUnitGroups = async (): Promise<UnitGroup[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups`, {
      headers,
    });

    const data: UnitGroupListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUnitGroups:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch unit groups: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching unit groups");
    }
  }
};

const fetchUnitGroup = async (id: string): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`, {
      headers,
    });

    const data: UnitGroupResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUnitGroup:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch unit group: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching the unit group");
    }
  }
};

const createUnitGroup = async (newUnitGroup: {
  unitGroupName: string;
  unitGroupType: string;
}): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUnitGroup),
    });

    const data: UnitGroupResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createUnitGroup:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create unit group: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while creating the unit group");
    }
  }
};

const updateUnitGroup = async (
  id: string,
  updatedUnitGroup: { unitGroupName: string; unitGroupType: string }
): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUnitGroup),
    });

    const data: UnitGroupResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateUnitGroup:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update unit group: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating the unit group");
    }
  }
};

const deleteUnitGroup = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`, {
      method: "DELETE",
      headers,
    });

    const data: ApiResponse<void> = await response.json();
    handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in deleteUnitGroup:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete unit group: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while deleting the unit group");
    }
  }
};

export const useCreateUnitGroup = (): UseMutationResult<
  UnitGroup,
  Error,
  { unitGroupName: string; unitGroupType: string }
> => {
  return useMutation<
    UnitGroup,
    Error,
    { unitGroupName: string; unitGroupType: string }
  >({
    mutationFn: createUnitGroup,
  });
};

export const useUpdateUnitGroup = (): UseMutationResult<
  UnitGroup,
  Error,
  { id: string; unitGroupName: string; unitGroupType: string }
> => {
  return useMutation<
    UnitGroup,
    Error,
    { id: string; unitGroupName: string; unitGroupType: string }
  >({
    mutationFn: ({ id, ...data }) => updateUnitGroup(id, data),
  });
};

export const useDeleteUnitGroup = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteUnitGroup,
  });
};

export const useUnitGroups = (): UseQueryResult<UnitGroup[], Error> => {
  return useQuery<UnitGroup[], Error>({
    queryKey: ["unitGroups"],
    queryFn: fetchUnitGroups,
  });
};

export const useUnitGroup = (id: string): UseQueryResult<UnitGroup, Error> => {
  return useQuery<UnitGroup, Error>({
    queryKey: ["unitGroup", id],
    queryFn: () => fetchUnitGroup(id),
    enabled: !!id,
  });
};