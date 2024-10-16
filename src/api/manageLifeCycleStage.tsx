import { ApiResponse, LifeCycleStage } from '@/types/lifeCycleStage'
import { useQuery, UseQueryResult } from '@tanstack/react-query'


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const fetchLifeCycleStages = async (): Promise<LifeCycleStage[]> => {
  const response = await fetch(`${VITE_BASE_URL}/life-cycle-stages`)
  
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
  }
  
  const data: ApiResponse = await response.json()
  
  if (data.status !== 'Success') {
    throw new ApiError(response.status, data.message || 'Unknown API error')
  }
  
  return data.data
}

export const useLifeCycleStages = (): UseQueryResult<LifeCycleStage[], ApiError> => {
  return useQuery<LifeCycleStage[], ApiError>({
    queryKey: ['lifeCycleStages'],
    queryFn: fetchLifeCycleStages,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false
      }
      return failureCount < 3
    },
  })
}