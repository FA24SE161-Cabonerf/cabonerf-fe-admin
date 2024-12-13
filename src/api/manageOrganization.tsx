import { headers } from "@/constants/headers";
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

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchOrganization = async (id: string): Promise<Organization> => {
  try {
    const response = await fetch(
      `${VITE_BASE_URL}/organizations/${id}`,
      { headers }
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
      { headers }
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
        headers: { ...headers },
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
        headers: { ...headers, "Content-Type": "application/json" },
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
        headers,
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
