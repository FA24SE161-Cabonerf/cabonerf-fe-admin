import { headers } from "@/constants/headers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import { UserListResponse, UserPaginatedResponse } from "@/types/userListType";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUsers = async (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): Promise<UserPaginatedResponse> => {
  try {
    const params = new URLSearchParams({
      pageCurrent: pageCurrent.toString(),
      pageSize: pageSize.toString(),
    });
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/users/admin?${params.toString()}`,
      { headers }
    );

    const data: UserListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUsers:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching users");
    }
  }
};

export const useUsers = (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): UseQueryResult<UserPaginatedResponse, Error> => {
  return useQuery<UserPaginatedResponse, Error>({
    queryKey: ["users", pageCurrent, pageSize, keyword],
    queryFn: () => fetchUsers(pageCurrent, pageSize, keyword),
  });
};