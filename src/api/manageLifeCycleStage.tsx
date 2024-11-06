import { headers } from '@/constants/headers'
import { LifeCycleStage, LifeCycleStageListResponse, LifeCycleStageResponse } from '@/types/lifeCycleStage'
import { useQuery, UseQueryResult, useMutation, UseMutationResult } from '@tanstack/react-query'
import { handleApiResponse } from './apiUtility'
import { ApiResponse } from '@/types/apiResponse'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const fetchLifeCycleStages = async (): Promise<LifeCycleStage[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/life-cycle-stages`, {
      headers
    })
    
    const data: LifeCycleStageListResponse = await response.json()
    return handleApiResponse(response, data)
  } catch (error) {
    console.error("Error in fetchLifeCycleStages:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch life cycle stages: ${error.message}`)
    } else {
      throw new Error("An unexpected error occurred while fetching life cycle stages")
    }
  }
}

const createLifeCycleStage = async (newLifeCycleStage: {
  name: string;
  description: string;
  iconUrl: string;
}): Promise<LifeCycleStage> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/life-cycle-stages`, 
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLifeCycleStage),
    })

    const data: LifeCycleStageResponse = await response.json()
    return handleApiResponse(response, data)
  } catch (error) {
    console.error("Error in createLifeCycleStage:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to create life cycle stage: ${error.message}`)
    } else {
      throw new Error("An unexpected error occurred while creating the life cycle stage")
    }
  }
}


const updateLifeCycleStage = async (
  id: string,
  updatedLifeCycleStage: { name: string; description: string; iconUrl: string }
): Promise<LifeCycleStage> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/life-cycle-stages/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLifeCycleStage),
    })

    const data: LifeCycleStageResponse = await response.json()
    return handleApiResponse(response, data)
  } catch (error) {
    console.error("Error in updateLifeCycleStage:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to update life cycle stage: ${error.message}`)
    } else {
      throw new Error("An unexpected error occurred while updating the life cycle stage")
    }
  }
}

const deleteLifeCycleStage = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/life-cycle-stages/${id}`, {
      method: "DELETE",
      headers,
    })

    const data: ApiResponse<void> = await response.json()
    handleApiResponse(response, data)
  } catch (error) {
    console.error("Error in deleteLifeCycleStage:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete life cycle stage: ${error.message}`)
    } else {
      throw new Error("An unexpected error occurred while deleting the life cycle stage")
    }
  }
}

export const useCreateLifeCycleStage = (): UseMutationResult<
  LifeCycleStage,
  Error,
  { name: string; description: string; iconUrl: string }
> => {
  return useMutation<
    LifeCycleStage,
    Error,
    { name: string; description: string; iconUrl: string }
  >({
    mutationFn: createLifeCycleStage,
  })
}


export const useUpdateLifeCycleStage = (): UseMutationResult<
  LifeCycleStage,
  Error,
  { id: string; name: string; description: string; iconUrl: string }
> => {
  return useMutation<
    LifeCycleStage,
    Error,
    { id: string; name: string; description: string; iconUrl: string }
  >({
    mutationFn: ({ id, ...data }) => updateLifeCycleStage(id, data),
  })
}

export const useDeleteLifeCycleStage = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteLifeCycleStage,
  })
}

export const useLifeCycleStages = (): UseQueryResult<LifeCycleStage[], Error> => {
  return useQuery<LifeCycleStage[], Error>({
    queryKey: ['lifeCycleStages'],
    queryFn: fetchLifeCycleStages,
  })
}
