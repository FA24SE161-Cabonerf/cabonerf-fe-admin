import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { getHeaders } from "@/constants/headers";
import { handleApiResponse } from "./apiUtility";
import { ApiResponse } from "@/types/apiResponse";
import { User } from "@/types/user";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchCurrentUser = async (userId: string): Promise<User> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/users/me`, {
      headers: {
        ...getHeaders(),
        'x-user-id': userId,
      },
    });

    const data: ApiResponse<User> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchCurrentUser:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch current user: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching current user");
    }
  }
};


interface UpdateProfileData {
  fullName: string;
  phone: string | null;
  profilePictureUrl: string | null;
  bio: string | null;
}

const updateProfile = async (data: UpdateProfileData, userId: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify(data),
    });

    const responseData: ApiResponse<void> = await response.json();
    return handleApiResponse(response, responseData);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating profile");
    }
  }
};

const updateUserAvatar = async (image: File, userId: string): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(`${VITE_BASE_URL}/users/avatar`, {
      method: 'PUT',
      headers: {
        ...getHeaders(),
        'x-user-id': userId,
      },
      body: formData,
    });

    const responseData: ApiResponse<void> = await response.json();
    return handleApiResponse(response, responseData);
  } catch (error) {
    console.error("Error in updateUserAvatar:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update user avatar: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while updating user avatar");
    }
  }
};

export const useCurrentUser = (userId: string | undefined): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ['currentUser', userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User ID is required to fetch user data");
      }
      return fetchCurrentUser(userId);
    },
    enabled: !!userId,
  });
};

export const useUpdateProfile = (): UseMutationResult<void, Error, { data: UpdateProfileData; userId: string }> => {
  return useMutation<void, Error, { data: UpdateProfileData; userId: string }>({
    mutationFn: ({ data, userId }) => updateProfile(data, userId),
  });
};

export const useUpdateUserAvatar = (): UseMutationResult<void, Error, { image: File; userId: string }> => {
  return useMutation<void, Error, { image: File; userId: string }>({
    mutationFn: ({ image, userId }) => updateUserAvatar(image, userId),
  });
};
