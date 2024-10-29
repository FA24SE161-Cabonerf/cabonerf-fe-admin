import { headers } from "@/constants/headers";
import {
  Perspective,
  PerspectiveListResponse,
  PerspectiveResponse,
} from "@/types/perspective";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const fetchPerspectives = async (): Promise<Perspective[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives/`, {
      headers,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: PerspectiveListResponse = await response.json();

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

const createPerspective = async (newPerspective: {
  name: string;
  description: string;
  abbr: string;
}): Promise<Perspective> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerspective),
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: PerspectiveResponse = await response.json();

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

const updatePerspective = async (
  id: string,
  updatedPerspective: {
    name: string;
    description: string;
    abbr: string;
  }
): Promise<Perspective> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerspective),
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: PerspectiveResponse = await response.json();

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

const deletePerspective = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/perspectives/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data: PerspectiveResponse = await response.json();

    if (data.status !== "Success") {
      throw new ApiError(response.status, data.message || "Unknown API error");
    }
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

export const useCreatePerspective = (): UseMutationResult<
  Perspective,
  ApiError,
  { name: string; description: string; abbr: string }
> => {
  return useMutation<
    Perspective,
    ApiError,
    { name: string; description: string; abbr: string }
  >({
    mutationFn: createPerspective,
  });
};

export const useUpdatePerspective = (): UseMutationResult<
  Perspective,
  ApiError,
  { id: string; name: string; description: string; abbr: string }
> => {
  return useMutation<
    Perspective,
    ApiError,
    { id: string; name: string; description: string; abbr: string }
  >({
    mutationFn: ({ id, ...data }) => updatePerspective(id, data),
  });
};

export const useDeletePerspective = (): UseMutationResult<
  void,
  ApiError,
  string
> => {
  return useMutation<void, ApiError, string>({
    mutationFn: deletePerspective,
  });
};

export const usePerspectives = (): UseQueryResult<Perspective[], ApiError> => {
  return useQuery<Perspective[], ApiError>({
    queryKey: ["perspectives"],
    queryFn: fetchPerspectives,
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
