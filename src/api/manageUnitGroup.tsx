
import { UnitGroup, UnitGroupListResponse, UnitGroupResponse } from '@/types/unitGroup';
import { useQuery, UseQueryResult } from '@tanstack/react-query'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const fetchUnitGroups = async (): Promise<UnitGroup[]> => {
  const response = await fetch(`${VITE_BASE_URL}/unit-groups`)
  
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
  }
  
  const data: UnitGroupListResponse = await response.json()
  
  if (data.status !== 'Success') {
    throw new ApiError(response.status, data.message || 'Unknown API error')
  }
  
  return data.data
}

const fetchUnitGroup = async (id: number): Promise<UnitGroup> => {
  const response = await fetch(`${VITE_BASE_URL}/unit-groups/${id}`)
  
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
  }
  
  const data: UnitGroupResponse = await response.json()
  
  if (data.status !== 'Success') {
    throw new ApiError(response.status, data.message || 'Unknown API error')
  }
  
  return data.data
}

export const useUnitGroups = (): UseQueryResult<UnitGroup[], ApiError> => {
  return useQuery<UnitGroup[], ApiError>({
    queryKey: ['unitGroups'],
    queryFn: fetchUnitGroups,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false
      }
      return failureCount < 3
    },
  })
}

export const useUnitGroup = (id: number): UseQueryResult<UnitGroup, ApiError> => {
  return useQuery<UnitGroup, ApiError>({
    queryKey: ['unitGroup', id],
    queryFn: () => fetchUnitGroup(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false
      }
      return failureCount < 3
    },
  })
}