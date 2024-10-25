import { headers } from "@/constants/headers";
import {
  UnitGroup,
  UnitGroupListResponse,
  UnitGroupResponse,
} from "@/types/unitGroup";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchUnitGroups = async (): Promise<UnitGroup[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups`, {
      headers,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: UnitGroupListResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(500, `Unexpected error: ${error.message}`);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

const fetchUnitGroup = async (id: number): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`, {
      headers
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: UnitGroupResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(500, `Unexpected error: ${error.message}`);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

const createUnitGroup = async (newUnitGroup: { unitGroupName: string; unitGroupType: string }): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUnitGroup),
    });

    const data: UnitGroupResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(404, error.message);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

const updateUnitGroup = async (id: number, updatedUnitGroup: { unitGroupName: string; unitGroupType: string }): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUnitGroup),
    });

    const data: UnitGroupResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(404, error.message);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

const deleteUnitGroup = async (id: number): Promise<UnitGroup> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`, {
      method: 'DELETE',
      headers,
    });

    const data: UnitGroupResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(404, error.message);
    } else {
      throw new ApiError(500, "An unknown error occurred");
    }
  }
};

export const useCreateUnitGroup = (): UseMutationResult<UnitGroup, ApiError, { unitGroupName: string; unitGroupType: string }> => {
  return useMutation<UnitGroup, ApiError, { unitGroupName: string; unitGroupType: string }>({
    mutationFn: createUnitGroup,
  });
};

export const useUpdateUnitGroup = (): UseMutationResult<UnitGroup, ApiError, { id: number; unitGroupName: string; unitGroupType: string }> => {
  return useMutation<UnitGroup, ApiError, { id: number; unitGroupName: string; unitGroupType: string }>({
    mutationFn: ({ id, ...data }) => updateUnitGroup(id, data),
  });
};

export const useDeleteUnitGroup = (): UseMutationResult<UnitGroup, ApiError, number> => {
  return useMutation<UnitGroup, ApiError, number>({
    mutationFn: deleteUnitGroup,
  });
};

export const useUnitGroups = (): UseQueryResult<UnitGroup[], ApiError> => {
  return useQuery<UnitGroup[], ApiError>({
    queryKey: ["unitGroups"],
    queryFn: fetchUnitGroups,
    retry: (failureCount, error) => {
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useUnitGroup = (
  id: number
): UseQueryResult<UnitGroup, ApiError> => {
  return useQuery<UnitGroup, ApiError>({
    queryKey: ["unitGroup", id],
    queryFn: () => fetchUnitGroup(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
};