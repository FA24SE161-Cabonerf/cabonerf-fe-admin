import { getHeaders } from "@/constants/headers";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { handleApiResponse } from "./apiUtility";
import {
  Organization,
  OrganizationListResponse,
  OrganizationPaginatedResponse,
  OrganizationResponse,
} from "@/types/organization";
import { Member, MemberListResponse } from "@/types/member";
import { ApiResponse } from "@/types/apiResponse";
type InviteUsersRequest = {
  userIds: string[];
  organizationId: string;
};

interface UserToInvite {
  id: string;
  fullName: string;
  email: string;
  profilePictureUrl: string;
}

interface UserInviteResponse {
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  users: UserToInvite[];
}

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchOrganization = async (id: string): Promise<Organization> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/organizations/${id}`,
      {   headers: getHeaders(), }
    );

    const data = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchOrganization:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch organization: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching the organization"
      );
    }
  }
};

const fetchOrganizations = async (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): Promise<OrganizationPaginatedResponse> => {
  try {
    const params = new URLSearchParams({
      pageCurrent: pageCurrent.toString(),
      pageSize: pageSize.toString(),
    });
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/manager/organizations?${params.toString()}`,
      {   headers: getHeaders(), }
    );

    const data: OrganizationListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchOrganizations:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch organizations: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching organizations"
      );
    }
  }
};
const createOrganization = async (newOrganization: {
  name: string;
  email: string;
  description: string;
  taxCode: string;
  industryCodeIds: string[];
  contractFile: File;
  logo: File;
}): Promise<Organization> => {
  try {
    const { name, email, description, taxCode, industryCodeIds, contractFile, logo } = newOrganization;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("taxCode", taxCode);
    industryCodeIds.forEach((id) => {
      formData.append(`industryCodeIds`, id);
    });
    formData.append("contractFile", contractFile);
    formData.append("logo", logo);

    const response = await fetch(
      `${VITE_BASE_URL}/manager/organizations`,
      {
        method: "POST",
        headers: getHeaders(),
        body: formData,
      }
    );

    const data: OrganizationResponse = await response.json();
    console.log(response.body)
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in createOrganization:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create organization: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while creating the organization"
      );
    }
  }
};

const updateOrganization = async (
  organizationId: string,
  name: string
): Promise<Organization> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/manager/organizations/${organizationId}`,
      {
        method: "PUT",
        headers: { ...getHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    const data: OrganizationResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in updateOrganization:", error);
    throw new Error("Failed to update organization");
  }
};
const deleteOrganization = async (organizationId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/manager/organizations/${organizationId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete organization");
    }
  } catch (error) {
    console.error("Error in deleteOrganization:", error);
    throw new Error("Failed to delete organization");
  }
};

const fetchOrganizationMembers = async (organizationId: string): Promise<Member[]> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/organizations/${organizationId}/members`,
      {   headers: getHeaders(), }
    );

    const data: MemberListResponse = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchOrganizationMembers:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch organization members: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching organization members"
      );
    }
  }
};

const inviteUsersToOrganization = async (request: InviteUsersRequest, userId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/organization-manager/organizations/invite`,
      {
        method: 'POST',
        headers: {
          ...getHeaders(),
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify(request),
      }
    );

    const data: ApiResponse<void> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in inviteUsersToOrganization:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to invite users to organization: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while inviting users to organization"
      );
    }
  }
};

const fetchUsersToInvite = async (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): Promise<UserInviteResponse> => {
  try {
    const params = new URLSearchParams({
      pageCurrent: pageCurrent.toString(),
      pageSize: pageSize.toString(),
    });
    if (keyword) params.append("keyword", keyword);

    const response = await fetch(
      `${VITE_BASE_URL}/users/invite?${params.toString()}`,
      {  headers: getHeaders(), }
    );

    const data: ApiResponse<UserInviteResponse> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in fetchUsersToInvite:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch users to invite: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching users to invite"
      );
    }
  }
};
const removeMemberFromOrganization = async (userOrganizationId: string, currentUserId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/organization-manager/organizations/remove-member/${userOrganizationId}`,
      {
        method: 'DELETE',
        headers: {
          ...getHeaders(),
          'x-user-id': currentUserId,
        },
      }
    );

    const data: ApiResponse<void> = await response.json();
    return handleApiResponse(response, data);
  } catch (error) {
    console.error("Error in removeMemberFromOrganization:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to remove member from organization: ${error.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while removing member from organization"
      );
    }
  }
};
export const useRemoveMemberFromOrganization = (): UseMutationResult<
  void,
  Error,
  { userOrganizationId: string; currentUserId: string },
  unknown
> => {
  return useMutation<void, Error, { userOrganizationId: string; currentUserId: string }>({
    mutationFn: ({ userOrganizationId, currentUserId }) => removeMemberFromOrganization(userOrganizationId, currentUserId),
  });
};

export const useUsersToInvite = (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): UseQueryResult<UserInviteResponse, Error> => {
  return useQuery<UserInviteResponse, Error>({
    queryKey: ["usersToInvite", pageCurrent, pageSize, keyword],
    queryFn: () => fetchUsersToInvite(pageCurrent, pageSize, keyword),
  });
};

export const useInviteUsersToOrganization = (): UseMutationResult<
  void,
  Error,
  { request: InviteUsersRequest; userId: string },
  unknown
> => {
  return useMutation<void, Error, { request: InviteUsersRequest; userId: string }>({
    mutationFn: ({ request, userId }) => inviteUsersToOrganization(request, userId),
  });
};


export const useOrganizationMembers = (
  organizationId: string
): UseQueryResult<Member[], Error> => {
  return useQuery<Member[], Error>({
    queryKey: ["organizationMembers", organizationId],
    queryFn: () => fetchOrganizationMembers(organizationId),
  });
};

export const useDeleteOrganization = (): UseMutationResult<
  void,
  Error,
  string,
  unknown
> => {
  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteOrganization(id),
  });
};

export const useUpdateOrganization = (): UseMutationResult<
  Organization,
  Error,
  { id: string; name: string },
  unknown
> => {
  return useMutation<Organization, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) => updateOrganization(id, name),
  });
};

export const useCreateOrganization = (): UseMutationResult<
  Organization,
  Error,
  {
    name: string;
    email: string;
    description: string;
    taxCode: string;
    industryCodeIds: string[];
    contractFile: File;
    logo: File;
  },
  unknown
> => {
  return useMutation<
    Organization,
    Error,
    {
      name: string;
      email: string;
      description: string;
      taxCode: string;
      industryCodeIds: string[];
      contractFile: File;
      logo: File;
    }
  >({
    mutationFn: createOrganization,
  });
};
export const useOrganization = (
  id: string
): UseQueryResult<Organization, Error> => {
  return useQuery<Organization, Error>({
    queryKey: ["organization", id],
    queryFn: () => fetchOrganization(id),
  });
};



export const useOrganizations = (
  pageCurrent: number,
  pageSize: number,
  keyword?: string
): UseQueryResult<OrganizationPaginatedResponse, Error> => {
  return useQuery<OrganizationPaginatedResponse, Error>({
    queryKey: ["organizations", pageCurrent, pageSize, keyword],
    queryFn: () => fetchOrganizations(pageCurrent, pageSize, keyword),
  });
};
