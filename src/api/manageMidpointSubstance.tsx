import { headers } from '@/constants/headers'
import { ApiResponse } from '@/types/midpointSubstance'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const fetchMidpointSubstances = async (page: number, pageSize: number): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/impacts/admin/midpoint-factors?currentPage=${page}&pageSize=${pageSize}`, {
      headers
    })
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }
    
    const data: ApiResponse = await response.json()
    
    if (data.status !== 'Success') {
      throw new ApiError(response.status, data.message || 'Unknown API error')
    }
    
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    } else if (error instanceof Error) {
      throw new ApiError(500, `Unexpected error: ${error.message}`)
    } else {
      throw new ApiError(500, 'An unknown error occurred')
    }
  }
}

export const useMidpointSubstances = (page: number, pageSize: number): UseQueryResult<ApiResponse, ApiError> => {
  return useQuery<ApiResponse, ApiError>({
    queryKey: ['midpointSubstances', page, pageSize],
    queryFn: () => fetchMidpointSubstances(page, pageSize),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false
      }
      return failureCount < 3
    },
  })
}